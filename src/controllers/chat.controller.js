import {
  generateRagResponse,
} from "../services/rag.service.js";

/*
|--------------------------------------------------------------------------
| Ask PDF Question
|--------------------------------------------------------------------------
*/

export const askPdfQuestion =
  async (req, res) => {

    try {

      const {
        pdfId,
        question,
      } = req.body;

      const userId =
        req.userId;

      /*
      |--------------------------------------------------------------------------
      | Validate Input
      |--------------------------------------------------------------------------
      */

      if (!pdfId || !question) {

        return res.status(400).json({

          success: false,

          message:
            "pdfId and question are required",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Generate RAG Response
      |--------------------------------------------------------------------------
      */

      const response =
        await generateRagResponse({

          pdfId,

          question,

          userId,
        });

      /*
      |--------------------------------------------------------------------------
      | Return Final Response
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({

        success: true,

        message:
          "Answer generated successfully",

        data: response,
      });

    } catch (error) {

  console.error(
    "CHAT CONTROLLER ERROR:",
    error
  );

  return res.status(500).json({

    success: false,

    message:
      error.message,

    error,
  });
};
  };