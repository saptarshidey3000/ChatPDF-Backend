import pdf from "pdf-parse";

/*
|---------------------------------------------------------
| Extract PDF Text
|---------------------------------------------------------
*/

export const extractPdfText =
  async (pdfBuffer) => {

    try {

      const data =
        await pdf(
          pdfBuffer
        );

      return data.text;

    } catch (error) {

      console.error(
        "PDF parsing error:",
        error
      );

      throw new Error(
        "Failed to parse PDF"
      );
    }
  };