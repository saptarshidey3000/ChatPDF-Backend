import {
  QdrantClient,
} from "@qdrant/js-client-rest";

console.log(
  "QDRANT URL:",
  process.env.QDRANT_URL
);

console.log(
  "QDRANT API KEY EXISTS:",
  !!process.env.QDRANT_API_KEY
);

const qdrant =
  new QdrantClient({

    url:
      process.env.QDRANT_URL,

    apiKey:
      process.env.QDRANT_API_KEY,
  });

export default qdrant;