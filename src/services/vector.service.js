import pinecone from "../config/pinecone.js";
import { generateEmbedding } from "./ai.service.js";

//getting Pinecone index instance
const index = pinecone.index(
  process.env.PINECONE_INDEX_NAME
);

/*
|--------------------------------------------------------------------------
| Store PDF Chunks In Pinecone
|--------------------------------------------------------------------------
|
| Steps:
|
| 1. Generate embedding
| 2. Convert chunk into vector
| 3. Store vector in Pinecone
|
*/
export const storePdfChunks = async ({
  pdfId,
  chunks,
}) => {

  try {

    console.log("Received chunks:", chunks);

    /*
    |--------------------------------------------------------------------------
    | Generate vectors
    |--------------------------------------------------------------------------
    */

    const vectors = await Promise.all(

      chunks.map(async (chunk) => {

        console.log(
          "\nGenerating embedding for:",
          chunk.content
        );

        const embedding =
          await generateEmbedding(
            chunk.content
          );

        /*
        |--------------------------------------------------------------------------
        | DEBUG EMBEDDING
        |--------------------------------------------------------------------------
        */

        console.log(
          "Embedding exists:",
          !!embedding
        );

        console.log(
          "Embedding length:",
          embedding?.length
        );

        /*
        |--------------------------------------------------------------------------
        | Return vector
        |--------------------------------------------------------------------------
        */

return {
  id: `${pdfId}-${chunk.chunkIndex}`,

  values: embedding,

  metadata: {
    pdfId: String(pdfId),

    chunkIndex: Number(
      chunk.chunkIndex
    ),

    pageNumber: Number(
      chunk.pageNumber
    ),

    text: String(
      chunk.content
    ).slice(0, 1000),
  },
};
      })
    );

    /*
    |--------------------------------------------------------------------------
    | DEBUG VECTORS
    |--------------------------------------------------------------------------
    */

    console.log(
      "\nFINAL VECTORS ARRAY:"
    );

    console.log(vectors);

    console.log(
      "VECTOR COUNT:",
      vectors.length
    );

    /*
    |--------------------------------------------------------------------------
    | UPSERT
    |--------------------------------------------------------------------------
    */

const upsertResponse =
  await index.namespace("").upsert(vectors);

console.log(
  "UPSERT RESPONSE:",
  upsertResponse
);

    console.log(
      "\nVectors stored successfully."
    );

  } catch (error) {

    console.error(
      "Error storing PDF chunks in Pinecone:",
      error
    );

    throw new Error(
      "Failed to store PDF chunks in Pinecone"
    );
  }
};

//search similar chunks in Pinecone
 export const searchSimilarChunks = async({
    query,
    topK = 5,
}) => {
    try {
        //convert query into embedding
        const queryEmbedding = await generateEmbedding(query);

        //search in Pinecone
        const searchResponse = await index.query({
                vector: queryEmbedding,
                topK,
                includeMetadata: true,
});
        return searchResponse;
    } catch (error) {
        console.error("Error searching similar chunks in Pinecone:", error);
        throw new Error("Failed to search similar chunks in Pinecone");
    }
}
