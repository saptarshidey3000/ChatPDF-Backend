import prisma from "../config/db.js";

export const createChat = async (data) => {
  return await prisma.chat.create({
    data: {
      userMessage: data.userMessage,
      aiResponse: data.aiResponse,
      pdfId: data.pdfId,
    },
  });
};

export const getPdfChats = async (pdfId) => {
  return await prisma.chat.findMany({
    where: {
      pdfId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};