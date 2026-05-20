import prisma from "../config/db.js";

export const createPdf = async (data) => {
  return await prisma.pdf.create({
    data: {
      fileName: data.fileName,
      originalName: data.originalName,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize,
      userId: data.userId,
    },
  });
};