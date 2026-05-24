import "dotenv/config";

import qdrant
from "../config/qdrant.js";

const COLLECTION_NAME =
  "chatpdf-collection";

const setupQdrant =
  async () => {

    try {

      /*
      |-----------------------------------------
      | Create Collection
      |-----------------------------------------
      */

      try {

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
          "Collection created successfully."
        );

      } catch (error) {

        if (
          error?.data?.status?.error?.includes(
            "already exists"
          )
        ) {

          console.log(
            "Collection already exists."
          );

        } else {

          throw error;
        }
      }

      /*
      |-----------------------------------------
      | Create Payload Index
      |-----------------------------------------
      */

      try {

        await qdrant.createPayloadIndex(
          COLLECTION_NAME,
          {
            field_name: "pdfId",
            field_schema: "keyword",
          }
        );

        console.log(
          "Payload index created successfully."
        );

      } catch (error) {

        if (
          error?.data?.status?.error?.includes(
            "already exists"
          )
        ) {

          console.log(
            "Payload index already exists."
          );

        } else {

          throw error;
        }
      }

      console.log(
        "Qdrant setup completed."
      );

    } catch (error) {

      console.error(
        "Qdrant setup failed:",
        error
      );
    }
  };

setupQdrant();