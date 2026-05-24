import { createRequire } from "module";

const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

/*
|-----------------------------------------
| Extract PDF Text
|-----------------------------------------
*/

export const extractPdfText =
  async (buffer) => {

    try {

      const data =
        await pdfParse(buffer);

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