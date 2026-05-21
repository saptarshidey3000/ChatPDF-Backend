import openai from "../config/openai";
/*
|--------------------------------------------------------------------------
| EMBEDDING GENERATION
|--------------------------------------------------------------------------
|
| This converts text into vectors.
|
| These vectors are later stored in Pinecone.
|
| Model:
| text-embedding-3-small
|
*/

export const generateEmbedding = async (text) => {
    try {
        //calling the OpenAI API to generate an embedding for the given text
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
        });
        return response.data[0].embedding;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw new Error("Failed to generate embedding");
    }
}