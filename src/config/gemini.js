import { GoogleGenAI } from "@google/genai";

/*
|--------------------------------------------------------------------------
| Centralized Gemini Client
|--------------------------------------------------------------------------
|
| This creates ONE reusable Gemini client
| for the entire backend.
|
| Later:
| - embeddings
| - chat
| - streaming
| - RAG
|
| will all use this same client.
|
*/

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default gemini;