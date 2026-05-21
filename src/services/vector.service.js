import qdrant
from "../config/qdrant.js";

import { generateEmbedding }
from "./ai.service.js";

const COLLECTION_NAME =
  "chatpdf-collection";

/*
|--------------------------------------------------------------------------
| Store PDF Chunks
|--------------------------------------------------------------------------
*/

export const storePdfChunks =
  async ({
    pdfId,
    chunks,
  }) => {

    try {

      const points = [];

      for (const chunk of chunks) {

        // Generate embedding
        const embedding =
          await generateEmbedding(
            chunk.content
          );

        // Create vector point
points.push({

  id:
    chunk.chunkIndex + 1,

  vector:
    embedding,

  payload: {

    pdfId,

    chunkIndex:
      chunk.chunkIndex,

    pageNumber:
      chunk.pageNumber,

    text:
      chunk.content,
  },
});
      }

      // Store vectors
      await qdrant.upsert(
        COLLECTION_NAME,
        {
          wait: true,
          points,
        }
      );

      console.log(
        "Chunks stored successfully."
      );

    } catch (error) {

      console.error(
        "Error storing chunks:",
        error
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Search Similar Chunks
|--------------------------------------------------------------------------
*/

export const searchSimilarChunks =
  async ({
    query,
    pdfId,
    topK = 5,
  }) => {

    try {

      // Generate query embedding
      const queryEmbedding =
        await generateEmbedding(query);

      // Search vectors
      const results =
        await qdrant.search(
          COLLECTION_NAME,
          {

            vector:
              queryEmbedding,

            limit:
              topK,

            filter: {
              must: [
                {
                  key: "pdfId",
                  match: {
                    value: pdfId,
                  },
                },
              ],
            },
          }
        );

      return results;

    } catch (error) {

      console.error(
        "Error searching chunks:",
        error
      );

      throw error;
    }
  };