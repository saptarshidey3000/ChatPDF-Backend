import * as PdfParse
from "pdf-parse-new";

/*
|---------------------------------------------------------
| Smart PDF Parser
|---------------------------------------------------------
*/

const parser =
  new PdfParse.SmartPDFParser({

    oversaturationFactor: 1.5,

    enableFastPath: true,

    enableCache: true,
  });

/*
|---------------------------------------------------------
| Extract PDF Text
|---------------------------------------------------------
*/

export const extractPdfText =
  async (buffer) => {

    try {

      const result =
        await parser.parse(
          buffer
        );

      console.log(
        "\nPDF PARSED SUCCESSFULLY\n"
      );

      console.log(
        "Pages:",
        result.numpages
      );

      console.log(
        "Method:",
        result?._meta?.method
      );

      console.log(
        "Duration:",
        result?._meta?.duration
      );

      return result.text;

    } catch (error) {

      console.error(
        "\nPDF PARSER ERROR:\n",
        error
      );

      throw new Error(
        "Failed to parse PDF"
      );
    }
  };