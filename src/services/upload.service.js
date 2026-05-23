import prisma from "../config/db.js";

import { utapi }
from "../config/uploadthing.js";

export const uploadPdfService =
  async ({
    file,
    userId,
  }) => {

    /*
    |-----------------------------------------
    | Upload File Buffer
    |-----------------------------------------
    */

    const uploadedFiles =
      await utapi.uploadFiles([
        new File(
          [file.buffer],
          file.originalname,
          {
            type:
              file.mimetype,
          }
        ),
      ]);

    const uploadedFile =
      uploadedFiles[0];

    console.log(
      uploadedFile
    );

    if (
      uploadedFile.error
    ) {
      throw new Error(
        uploadedFile.error.message
      );
    }

    /*
    |-----------------------------------------
    | Save DB
    |-----------------------------------------
    */

    const pdf =
      await prisma.pdf.create({
        data: {

          fileName:
            uploadedFile.data.name,

          originalName:
            file.originalname,

          fileUrl:
            uploadedFile.data.ufsUrl,

          fileSize:
            file.size,

          userId,

          processingStatus:
            "PROCESSING",
        },
      });

    return pdf;
  };