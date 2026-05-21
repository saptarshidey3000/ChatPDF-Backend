import "dotenv/config";

import {
  generateEmbedding,
  generateChatCompletion,
} from "./services/ai.service.js";

const test = async () => {
  try {

    console.log("\n--- TESTING EMBEDDINGS ---\n");

    const embedding =
      await generateEmbedding(
        "Machine learning is amazing"
      );

    /*
      Prints vector size
    */

    console.log(
      "Embedding Length:",
      embedding.length
    );

    /*
      Prints first few numbers
    */

    console.log(
      "First 5 Values:",
      embedding.slice(0, 5)
    );

    console.log("\n--- TESTING CHAT ---\n");

    const response =
      await generateChatCompletion({
        systemPrompt:
          "You are a helpful AI assistant.",

        userMessage:
          "Explain machine learning simply",
      });

    console.log(response);

  } catch (error) {

    console.error(error);

  }
};

test();