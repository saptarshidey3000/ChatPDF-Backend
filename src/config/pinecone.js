import { Pinecone } from
"@pinecone-database/pinecone";

/*
|--------------------------------------------------------------------------
| Centralized Pinecone Client
|--------------------------------------------------------------------------
|
| One reusable Pinecone instance
| for the entire backend.
|
*/

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export default pinecone;