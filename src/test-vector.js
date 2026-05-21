import "dotenv/config";

import {
  storePdfChunks,
  searchSimilarChunks,
} from "./services/vector.service.js";

const testVectorFlow = async () => {

  try {

    console.log(
      "\n--- STORING TEST CHUNKS ---\n"
    );

    /*
    |--------------------------------------------------------------------------
    | Fake PDF chunks
    |--------------------------------------------------------------------------
    |
    | Simulating chunks extracted from PDF
    |
    */

    const chunks = [
      {
        chunkIndex: 0,

        pageNumber: 1,

        content:
          "Machine learning is a subset of artificial intelligence.",
      },

      {
        chunkIndex: 1,

        pageNumber: 2,

        content:
          "Deep learning uses neural networks with multiple layers.",
      },

      {
        chunkIndex: 2,

        pageNumber: 3,

        content:
          "Natural language processing helps computers understand language.",
      },
    ];

    /*
    |--------------------------------------------------------------------------
    | Store vectors in Pinecone
    |--------------------------------------------------------------------------
    */

    await storePdfChunks({
      pdfId: "test-pdf-123",

      chunks,
    });

    console.log(
      "Chunks stored successfully."
    );

    console.log(
      "\n--- TESTING SIMILARITY SEARCH ---\n"
    );

    /*
    |--------------------------------------------------------------------------
    | User question
    |--------------------------------------------------------------------------
    */

    const results =
      await searchSimilarChunks({

        query:
          "What is AI?",

        topK: 2,
      });

    /*
    |--------------------------------------------------------------------------
    | Print results
    |--------------------------------------------------------------------------
    */

    console.log(
      JSON.stringify(results, null, 2)
    );

  } catch (error) {

    console.error(error);

  }
};

testVectorFlow();