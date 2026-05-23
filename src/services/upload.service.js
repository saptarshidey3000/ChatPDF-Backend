import prisma from "../config/db.js";

import { utapi } from "../config/uploadthing.js";

export const uploadPdfService = async ({
  file,
  userId,
}) => {

  /*
  |--------------------------------------------------
  | Convert multer buffer to File
  |--------------------------------------------------
  */

  const pdfFile = new File(
    [file.buffer],
    file.originalname,
    {
      type: file.mimetype,
    }
  );

  /*
  |--------------------------------------------------
  | Upload to UploadThing
  |--------------------------------------------------
  */

  const uploadedFile =
    await utapi.uploadFiles(pdfFile);

  /*
  |--------------------------------------------------
  | Upload failed
  |--------------------------------------------------
  */

  if (!uploadedFile.data) {
    throw new Error(
      "Failed to upload PDF"
    );
  }

  /*
  |--------------------------------------------------
  | Save metadata to DB
  |--------------------------------------------------
  */

  const pdf = await prisma.pdf.create({
    data: {
      fileName:
        uploadedFile.data.name,

      originalName:
        file.originalname,

      fileUrl:
        uploadedFile.data.url,

      fileSize:
        file.size,

      userId,

      processingStatus:
        "PROCESSING",
    },
  });

  return pdf;
};