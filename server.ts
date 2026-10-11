import express from "express";
import path from "path";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import multer from "multer";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { GoogleGenAI, Type, Schema } from "@google/genai";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const production = process.env.NODE_ENV === 'production' || process.argv.includes('--production');

  app.use(express.json({ limit: "50mb" }));
  app.use('/api', (req, res, next) => {
    if (production) return res.status(403).json({ error: 'O editor e suas APIs estão disponíveis apenas na prévia local.' });
    const origin = req.headers.origin;
    if (origin && ![`http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`].includes(origin)) return res.status(403).json({ error: 'Origem não permitida.' });
    next();
  });
  app.get('/api/config', (_req, res) => res.json({ aiEnabled: !!process.env.GEMINI_API_KEY }));

  const dataDir = path.join(process.cwd(), '.local-data');
  const readLocal = async (name: string) => {
    try { return JSON.parse(await readFile(path.join(dataDir, name), 'utf8')); }
    catch (error: any) { if (error.code === 'ENOENT') return null; throw error; }
  };
  const writeLocal = async (name: string, data: unknown) => {
    await mkdir(dataDir, { recursive: true });
    const target = path.join(dataDir, name);
    const temporary = `${target}.${process.pid}.tmp`;
    await writeFile(temporary, JSON.stringify(data, null, 2), 'utf8');
    await rename(temporary, target);
  };
  const isProject = (item: any) => item && typeof item.id === 'string' && item.id.length > 0 && typeof item.title === 'string' && item.title.trim().length > 0 && typeof item.category === 'string' && Array.isArray(item.tags) && item.tags.every((tag: any) => typeof tag === 'string') && (!item.image || typeof item.image === 'string');
  app.get('/api/projects', async (_req, res) => {
    try { res.json({ projects: await readLocal('projects.json') }); }
    catch { res.status(500).json({ error: 'Não foi possível carregar os projetos.' }); }
  });
  app.put('/api/projects', async (req, res) => {
    const projects = req.body?.projects;
    if (!Array.isArray(projects) || !projects.every(isProject) || new Set(projects.map((item: any) => item.id)).size !== projects.length) return res.status(400).json({ error: 'Lista de projetos inválida.' });
    try { await writeLocal('projects.json', projects); res.json({ ok: true }); }
    catch { res.status(500).json({ error: 'Não foi possível salvar os projetos.' }); }
  });
  app.get('/api/cv', async (_req, res) => {
    try { res.json({ content: await readLocal('cv.json') }); }
    catch { res.status(500).json({ error: 'Não foi possível carregar o currículo.' }); }
  });
  app.put('/api/cv', async (req, res) => {
    const content = req.body?.content;
    if (!content || typeof content !== 'object' || !content.cvData?.pt || !content.designData || typeof content.cvData.pt !== 'object') return res.status(400).json({ error: 'Dados do currículo inválidos.' });
    try { await writeLocal('cv.json', content); res.json({ ok: true }); }
    catch { res.status(500).json({ error: 'Não foi possível salvar o currículo.' }); }
  });
  app.get('/api/cv/pdf', async (_req, res) => {
    const saved = path.join(dataDir, 'curriculo.pdf');
    res.set('Cache-Control', 'no-store');
    try { res.type('application/pdf').send(await readFile(saved)); }
    catch { res.type('application/pdf').send(await readFile(path.join(process.cwd(), 'public', 'Mariana-Senciani.pdf'))); }
  });
  app.put('/api/cv/pdf', express.raw({ type: 'application/pdf', limit: '10mb' }), async (req, res) => {
    const pdf = req.body;
    if (!Buffer.isBuffer(pdf) || pdf.length < 5 || pdf.subarray(0, 5).toString() !== '%PDF-') return res.status(400).json({ error: 'Envie um PDF válido.' });
    try { await mkdir(dataDir, { recursive: true }); await writeFile(path.join(dataDir, 'curriculo.pdf'), pdf); res.json({ ok: true }); }
    catch { res.status(500).json({ error: 'Não foi possível salvar o PDF.' }); }
  });

  // Initialize Gemini
  let ai: GoogleGenAI | null = null;
  function getAI() {
    if (!ai) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error('GEMINI_API_KEY environment variable is required');
      }
      ai = new GoogleGenAI({ apiKey: key });
    }
    return ai;
  }

  // --- API Routes ---

  // 1. Translate CV Data
  app.post("/api/translate", async (req, res) => {
    try {
      const { data, sourceLang, targetLangs } = req.body;
      const genAI = getAI();

      if (!targetLangs || !Array.isArray(targetLangs)) {
        return res.status(400).json({ error: "targetLangs must be an array" });
      }

      const properties: any = {};
      const required: string[] = [];

      targetLangs.forEach((lang: string) => {
        properties[lang] = {
            type: Type.OBJECT,
            properties: {
              personal: { type: Type.OBJECT, description: "Translate roles/fields, leave proper nouns intact" },
              summary: { type: Type.STRING },
              experience: { type: Type.ARRAY, items: { type: Type.OBJECT } },
              education: { type: Type.ARRAY, items: { type: Type.OBJECT } },
              courses: { type: Type.ARRAY, items: { type: Type.OBJECT } },
              skills: { type: Type.ARRAY, items: { type: Type.OBJECT } },
              languages: { type: Type.ARRAY, items: { type: Type.OBJECT } },
              keywords: { type: Type.STRING },
            }
        };
        required.push(lang);
      });

      const responseSchema = {
        type: Type.OBJECT,
        properties,
        required
      };

      const prompt = `Translate the following CV data from ${sourceLang} into the following languages: ${targetLangs.join(', ')}.
CRITICAL CONSTRAINT: Do NOT translate proper nouns (e.g., city names like "São Paulo", "Rio de Janeiro", company names, or people's names). Keep them in their native language exactly as provided.
Only translate titles, descriptions, skills, summaries, etc. Do not change structure.

CV Data (${sourceLang}):
${JSON.stringify(data, null, 2)}`;

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema as Schema,
          temperature: 0.1,
        }
      });

      const resultText = response.text || "{}";
      const translations = JSON.parse(resultText);
      res.json(translations);

    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // 2. Parse PDF Resume
  app.post("/api/parse-cv", upload.single("pdf"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No PDF file provided" });
      }

      const pdfData = await pdfParse(req.file.buffer);
      const pdfText = pdfData.text;

      const genAI = getAI();

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          personal: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              email: { type: Type.STRING },
              phone: { type: Type.STRING },
              location: { type: Type.STRING },
              linkedin: { type: Type.STRING },
              portfolio: { type: Type.STRING },
            }
          },
          summary: { type: Type.STRING },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                role: { type: Type.STRING },
                period: { type: Type.STRING },
                activities: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                institution: { type: Type.STRING },
                degree: { type: Type.STRING },
                period: { type: Type.STRING },
              }
            }
          },
          courses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                institution: { type: Type.STRING },
                duration: { type: Type.STRING },
                year: { type: Type.STRING },
                certificateLink: { type: Type.STRING },
              }
            }
          },
          skills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          languages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                level: { type: Type.STRING }
              }
            }
          },
          keywords: { type: Type.STRING }
        }
      };

      const prompt = `Parse the following resume text and extract the information into structured JSON. Format the data according to the schema. 
Infer categories for skills if not explicitly categorized. For courses, try to find the duration and year if mentioned.

Resume Text:
${pdfText}`;

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema as Schema,
          temperature: 0.1,
        }
      });

      const resultText = response.text || "{}";
      const parsedCV = JSON.parse(resultText);
      res.json(parsedCV);

    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });


  // Vite middleware for development
  if (!production) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "127.0.0.1", (error?: Error) => {
    if (error) {
      console.error(`Could not start local server on port ${PORT}:`, error.message);
      process.exitCode = 1;
      return;
    }
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
