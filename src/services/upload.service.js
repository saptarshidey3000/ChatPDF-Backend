import prisma from "../config/db.js";
import { utapi } from "../config/uploadthing.js";

export const uploadPdfService = async ({
  file,
  userId,
}) => {

  console.log("STEP 1");

  console.log("FILE EXISTS:", !!file);

  console.log("BUFFER EXISTS:", !!file.buffer);

  /*
  |-----------------------------------------
  | Create File
  |-----------------------------------------
  */

  const pdfFile = new File(
    [file.buffer],
    file.originalname,
    {
      type: file.mimetype,
    }
  );

  console.log("STEP 2");

  console.log(pdfFile);

  /*
  |-----------------------------------------
  | UploadThing Upload
  |-----------------------------------------
  */

  const uploadedFiles =
    await utapi.uploadFiles([pdfFile]);

  console.log("STEP 3");

  console.log(uploadedFiles);

  const uploadedFile =
    uploadedFiles[0];

  if (!uploadedFile?.data) {
    throw new Error(
      "Failed UploadThing upload"
    );
  }

  console.log("STEP 4");

  /*
  |-----------------------------------------
  | Save DB
  |-----------------------------------------
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

  console.log("STEP 5");

  return pdf;
};