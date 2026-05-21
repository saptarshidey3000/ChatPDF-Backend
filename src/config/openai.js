import OpenAi from "openai";

/*
  Creating centralized OpenAI client

  Why?

  Because later:
  - embeddings
  - chat
  - streaming
  - RAG

  will all use the SAME client.
*/

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export default openai;