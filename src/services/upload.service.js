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
    | Convert Buffer -> Blob
    |-----------------------------------------
    */

    const blob = new Blob(
      [file.buffer],
      {
        type: file.mimetype,
      }
    );

    /*
    |-----------------------------------------
    | Create File
    |-----------------------------------------
    */

    const pdfFile = new File(
      [blob],
      file.originalname,
      {
        type: file.mimetype,
        lastModified: Date.now(),
      }
    );

    /*
    |-----------------------------------------
    | UploadThing Upload
    |-----------------------------------------
    */

    const response =
      await utapi.uploadFiles(
        [pdfFile]
      );

    console.log(response);

    const uploadedFile =
      response[0];

    /*
    |-----------------------------------------
    | Upload Error
    |-----------------------------------------
    */

    if (
      !uploadedFile ||
      uploadedFile.error
    ) {
      throw new Error(
        uploadedFile?.error?.message ||
        "Upload failed"
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