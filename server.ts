import express from "express";
import path from "path";
import multer from "multer";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { createServer as createViteServer } from "vite";

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

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
  if (process.env.NODE_ENV !== "production") {
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
