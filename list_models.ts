import { GoogleGenAI } from "@google/genai";
const key = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: key });
async function list() {
  const models = await ai.models.list();
  for await (const model of models) {
    console.log(model.name);
  }
}
list();
