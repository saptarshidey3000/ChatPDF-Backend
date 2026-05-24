import "dotenv/config";

import qdrant
from "../config/qdrant.js";

const createCollection =
  async () => {

    try {

      await qdrant.createCollection(
        "chatpdf-collection",
        {
          vectors: {
            size: 3072,
            distance: "Cosine",
          },
        }
      );

      console.log(
        "Collection created successfully."
      );

    } catch (error) {

      console.error(error);
    }
  };

createCollection();