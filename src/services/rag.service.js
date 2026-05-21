import prisma
from "../config/db.js";

import {
  searchSimilarChunks,
} from "./vector.service.js";

import {
  generateChatCompletion,
} from "./ai.service.js";

/*
|--------------------------------------------------------------------------
| Generate RAG Response
|--------------------------------------------------------------------------
*/

export const generateRagResponse =
  async ({
    pdfId,
    question,
    userId,
  }) => {

    /*
    |--------------------------------------------------------------------------
    | Retrieve Relevant Chunks
    |--------------------------------------------------------------------------
    */

    const retrievedChunks =
      await searchSimilarChunks({

        query: question,

        pdfId,

        topK: 5,
      });

    /*
    |--------------------------------------------------------------------------
    | Build Context
    |--------------------------------------------------------------------------
    */

    const context =
      retrievedChunks
        .map((chunk) => {

          return `
PAGE ${chunk.payload.pageNumber}:

${chunk.payload.text}
`;
        })
        .join("\n\n");

    /*
    |--------------------------------------------------------------------------
    | System Prompt
    |--------------------------------------------------------------------------
    */

    const systemPrompt = `
You are an AI PDF assistant.

Answer ONLY using the provided PDF context.

If the answer is not present in the context,
say:

"I could not find this information in the PDF."

Always mention page numbers when possible.

Keep answers concise and grounded.

PDF Context:
${context}
`;

    /*
    |--------------------------------------------------------------------------
    | Generate AI Response
    |--------------------------------------------------------------------------
    */

    const aiResponse =
      await generateChatCompletion({

        systemPrompt,

        userMessage: question,
      });

    /*
    |--------------------------------------------------------------------------
    | Citation Format
    |--------------------------------------------------------------------------
    */

    const citations =
      retrievedChunks.map((chunk) => ({

        pageNumber:
          chunk.payload.pageNumber,

        text:
          chunk.payload.text,
      }));

    /*
    |--------------------------------------------------------------------------
    | Store Chat History
    |--------------------------------------------------------------------------
    */

    await prisma.chat.create({

      data: {

        pdfId,

        userMessage:
          question,

        aiResponse,
      },
    });

    /*
    |--------------------------------------------------------------------------
    | Return Final Response
    |--------------------------------------------------------------------------
    */

    return {

      answer:
        aiResponse,

      citations,
    };
  };