import { QdrantClient }
from "@qdrant/js-client-rest";

/*
|--------------------------------------------------------------------------
| Qdrant Client
|--------------------------------------------------------------------------
*/

const qdrant =
  new QdrantClient({
    url: "http://localhost:6333",
  });

export default qdrant;