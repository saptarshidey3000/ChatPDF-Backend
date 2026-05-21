import gemini from "../config/gemini.js";

/*
|--------------------------------------------------------------------------
| EMBEDDING GENERATION
|--------------------------------------------------------------------------
|
| Converts text into vector embeddings.
|
| These embeddings are later stored in Pinecone.
|
| Model:
| text-embedding-004
|
*/

export const generateEmbedding = async (text) => {
  try {

    const response =
      await gemini.models.embedContent({

        model: "gemini-embedding-001",

        contents: text,
      });

    return response.embeddings[0].values;

  } catch (error) {

    console.error(
      "Error generating embedding:",
      error
    );

    throw new Error(
      "Failed to generate embedding"
    );
  }
};

/*
|--------------------------------------------------------------------------
| CHAT COMPLETION
|--------------------------------------------------------------------------
|
| Generates AI responses.
|
| Model:
| gemini-2.0-flash
|
*/

export const generateChatCompletion = async ({
  systemPrompt,
  userMessage,
}) => {
  try {

    /*
    |--------------------------------------------------------------------------
    | Combining system + user prompt
    |--------------------------------------------------------------------------
    |
    | Gemini SDK works differently from OpenAI.
    |
    | So we manually combine context.
    |
    */

    const prompt = `
System Instructions:
${systemPrompt}

User Message:
${userMessage}
`;

    /*
    |--------------------------------------------------------------------------
    | Calling Gemini Chat Model
    |--------------------------------------------------------------------------
    */

    const response =
      await gemini.models.generateContent({

         model: "gemini-2.5-flash",

        contents: prompt,
      });

    /*
    |--------------------------------------------------------------------------
    | Returning final AI text response
    |--------------------------------------------------------------------------
    */

    return response.text;

  } catch (error) {

    console.error(
      "Error generating chat completion:",
      error
    );

    throw new Error(
      "Failed to generate chat completion"
    );
  }
};