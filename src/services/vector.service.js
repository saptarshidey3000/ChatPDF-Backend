import pinecone from "../config/pinecone.js";
import { generateEmbedding } from "./ai.service.js";

//getting Pinecone index instance
const index = pinecone.Index(
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
export const storePdfChunks = async({
    pdfId,
    chunks,
}) => {
    try {
        //convert each chunk into vector and store in Pinecone
        const vectors = await Promise.all(
            chunks.map(async (chunk) => {
                const embedding = await generateEmbedding(
                    chunk.content
                );
                return {
                    id: `${pdfId}-chunk-${chunk.chunkIndex}`,
                    values: embedding,
                    metadata: {
                        pdfId,
                        chunkIndex: chunk.chunkIndex,
                        pageNumber: chunk.pageNumber,
                        content: chunk.content,
                    },
                };
            })
        );
        await index.upsert(vectors);
        console.log(`Successfully stored ${vectors.length} chunks for PDF ID: ${pdfId} in Pinecone.`);
    } catch (error) {
        console.error("Error storing PDF chunks in Pinecone:", error);
        throw new Error("Failed to store PDF chunks in Pinecone");
    }
}

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
            queryRequest: {
                vector: queryEmbedding,
                topK,
                includeMetadata: true,
            },
        });
        return searchResponse;
    } catch (error) {
        console.error("Error searching similar chunks in Pinecone:", error);
        throw new Error("Failed to search similar chunks in Pinecone");
    }
}
