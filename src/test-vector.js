// src/test-vector.js

import "dotenv/config";

import {
  storePdfChunks,
  searchSimilarChunks,
} from "./services/vector.service.js";

/*
|--------------------------------------------------------------------------
| TEST VECTOR FLOW
|--------------------------------------------------------------------------
*/

const testVectorFlow = async () => {

  try {

    console.log(
      "\n--- STORING TEST CHUNKS ---\n"
    );

    /*
    |--------------------------------------------------------------------------
    | Fake PDF Chunks
    |--------------------------------------------------------------------------
    */

    const testChunks = [

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
    | Store Chunks
    |--------------------------------------------------------------------------
    */

    const storeResponse =
      await storePdfChunks({

        pdfId:
          "test-pdf-123",

        chunks:
          testChunks,
      });

    console.log(
      "\nSTORE RESPONSE:\n"
    );

    console.log(storeResponse);

    /*
    |--------------------------------------------------------------------------
    | Similarity Search
    |--------------------------------------------------------------------------
    */

    console.log(
      "\n--- TESTING SEARCH ---\n"
    );

    const searchResults =
      await searchSimilarChunks({

        query:
          "What is deep learning?",

        pdfId:
          "test-pdf-123",

        topK:
          2,
      });

    console.log(
      "\nSEARCH RESULTS:\n"
    );

    console.log(
      JSON.stringify(
        searchResults,
        null,
        2
      )
    );

    console.log(
      "\n--- TEST SUCCESSFUL ---\n"
    );

  } catch (error) {

    console.error(
      "\n--- TEST FAILED ---\n"
    );

    console.error(error);

    if (error?.message) {

      console.log(
        "\nERROR MESSAGE:\n"
      );

      console.log(error.message);
    }

    if (error?.stack) {

      console.log(
        "\nSTACK TRACE:\n"
      );

      console.log(error.stack);
    }
  }
};

/*
|--------------------------------------------------------------------------
| RUN TEST
|--------------------------------------------------------------------------
*/

testVectorFlow();