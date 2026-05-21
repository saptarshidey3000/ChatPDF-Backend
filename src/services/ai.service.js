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

    /*
    |--------------------------------------------------------------------------
    | Generate embedding using Gemini
    |--------------------------------------------------------------------------
    */

    const response =
      await gemini.models.embedContent({

        model: "gemini-embedding-001",

        contents: {
          parts: [
            {
              text,
            },
          ],
        },
      });

    /*
    |--------------------------------------------------------------------------
    | DEBUG FULL RESPONSE
    |--------------------------------------------------------------------------
    */

    // console.log(
    //   "FULL EMBEDDING RESPONSE:",
    //   JSON.stringify(response, null, 2)
    // );

    /*
    |--------------------------------------------------------------------------
    | Extract embedding values
    |--------------------------------------------------------------------------
    */

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

    const prompt = `
SYSTEM:
${systemPrompt}

USER:
${userMessage}
`;

    const response =
      await gemini.models.generateContent({

        model:
          "gemini-2.5-flash",

        contents: prompt,
      });

    console.log(
      "\nFULL GEMINI RESPONSE:\n",
      JSON.stringify(response, null, 2)
    );

    /*
    |--------------------------------------------------------------------------
    | Extract AI text safely
    |--------------------------------------------------------------------------
    */

    const text =
      response?.candidates?.[0]
        ?.content?.parts?.[0]?.text;

    if (!text) {

      throw new Error(
        "No AI response generated"
      );
    }

    return text;

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