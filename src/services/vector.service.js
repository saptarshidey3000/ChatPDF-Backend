import qdrant
from "../config/qdrant.js";

import { randomUUID }
from "crypto";

import {
  generateEmbedding,
} from "./ai.service.js";

const COLLECTION_NAME =
  "chatpdf-collection";

/*
|------------------------------------------------------------------
| Store PDF Chunks
|------------------------------------------------------------------
*/

export const storePdfChunks =
  async ({
    pdfId,
    chunks,
  }) => {

    try {

      const points = [];

      for (const chunk of chunks) {

        /*
        |------------------------------------------------------------
        | Generate Embedding
        |------------------------------------------------------------
        */

        const embedding =
          await generateEmbedding(
            chunk.content
          );

        /*
        |------------------------------------------------------------
        | Create Vector Point
        |------------------------------------------------------------
        */

        points.push({

          id:
            randomUUID(),

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

      console.log(
        "\nTOTAL POINTS TO STORE:\n",
        points.length
      );

      /*
      |------------------------------------------------------------
      | Store Vectors In Qdrant
      |------------------------------------------------------------
      */

      await qdrant.upsert(
        COLLECTION_NAME,
        {
          wait: true,
          points,
        }
      );

      console.log(
        "\nCHUNKS STORED SUCCESSFULLY\n"
      );

    } catch (error) {

      console.error(
        "\nERROR STORING CHUNKS:\n",
        error
      );

      throw error;
    }
  };

/*
|------------------------------------------------------------------
| Search Similar Chunks
|------------------------------------------------------------------
*/

export const searchSimilarChunks =
  async ({
    query,
    pdfId,
    topK = 5,
  }) => {

    try {

      /*
      |------------------------------------------------------------
      | Generate Query Embedding
      |------------------------------------------------------------
      */

      const queryEmbedding =
        await generateEmbedding(
          query
        );

      console.log(
        "\nSEARCHING FOR PDF ID:\n",
        pdfId
      );

      /*
      |------------------------------------------------------------
      | Search Vectors
      |------------------------------------------------------------
      */

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

      console.log(
        "\nSEARCH RESULTS COUNT:\n",
        results.length
      );

      if (results[0]) {

        console.log(
          "\nFIRST SEARCH RESULT:\n",
          results[0]
        );
      }

      return results;

    } catch (error) {

      console.error(
        "\nERROR SEARCHING CHUNKS:\n",
        error
      );

      throw error;
    }
  };