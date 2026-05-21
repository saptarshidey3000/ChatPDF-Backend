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
};
/*
|--------------------------------------------------------------------------
| CHAT COMPLETION
|--------------------------------------------------------------------------
|
| This generates AI responses.
|
| Model:
| GPT-4.1-mini
|
*/
export const generateChatCompletion = async (
systemPrompt,
userMessage,
) => {
    try {
        //sending conversation to openai to generate a response
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userMessage,
                },
            ] ,
            //lowering the temperature makes the output more deterministic
            temperature: 0.2,
        });
        return response.choices[0].message;
    } catch (error) {
        console.error("Error generating chat completion:", error);
        throw new Error("Failed to generate chat completion");
    }
}