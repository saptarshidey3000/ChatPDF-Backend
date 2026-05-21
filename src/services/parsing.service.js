import pdfParse from "pdf-parse";

export const parsePdf = async (buffer) => {
  const data = await pdfParse(buffer);

  return {
    text: data.text,
    totalPages: data.numpages,
    info: data.info,
  };
};