import "dotenv/config";

import qdrant
from "../config/qdrant.js";

const COLLECTION_NAME =
  "chatpdf-collection";

const reset =
  async () => {

    try {

      await qdrant.deleteCollection(
        COLLECTION_NAME
      );

      console.log(
        "Old collection deleted."
      );

    } catch (error) {

      console.log(
        "Collection may not exist."
      );
    }

    await qdrant.createCollection(
      COLLECTION_NAME,
      {
        vectors: {
          size: 3072,
          distance: "Cosine",
        },
      }
    );

    console.log(
      "Collection recreated."
    );

    await qdrant.createPayloadIndex(
      COLLECTION_NAME,
      {
        field_name: "pdfId",
        field_schema: "keyword",
      }
    );

    console.log(
      "Payload index created."
    );
  };

reset();