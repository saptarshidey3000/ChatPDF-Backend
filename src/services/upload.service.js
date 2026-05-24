import prisma from "../config/db.js";

import cloudinary
from "../config/cloudinary.js";

import streamifier
from "streamifier";

import {
  extractPdfText,
} from "./pdf-parser.service.js";

import {
  chunkText,
} from "./chunking.service.js";

import {
  storePdfChunks,
} from "./vector.service.js";

export const uploadPdfService =
  async ({
    file,
    userId,
  }) => {

    /*
    |-----------------------------------------
    | Upload PDF To Cloudinary
    |-----------------------------------------
    */

    const uploadResult =
      await new Promise(
        (resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(

              {
                resource_type:
                  "raw",

                folder:
                  "chatpdf",
              },

              (error, result) => {

                if (error)
                  reject(error);

                else
                  resolve(result);
              }
            );

          streamifier
            .createReadStream(
              file.buffer
            )
            .pipe(stream);
        }
      );

    /*
    |-----------------------------------------
    | Save PDF Metadata
    |-----------------------------------------
    */

    const pdf =
      await prisma.pdf.create({

        data: {

          fileName:
            uploadResult.public_id,

          originalName:
            file.originalname,

          fileUrl:
            uploadResult.secure_url,

          fileSize:
            file.size,

          userId,

          processingStatus:
            "PROCESSING",
        },
      });

    /*
    |-----------------------------------------
    | Extract PDF Text
    |-----------------------------------------
    */

    const extractedText =
      await extractPdfText(
        file.buffer
      );

    /*
    |-----------------------------------------
    | Create Chunks
    |-----------------------------------------
    */

    const chunks =
      chunkText({

        text:
          extractedText,

        pageNumber: 1,
      });

    /*
    |-----------------------------------------
    | Store Vectors In Qdrant
    |-----------------------------------------
    */

    await storePdfChunks({

      pdfId:
        pdf.id,

      chunks,
    });

    /*
    |-----------------------------------------
    | Update Status
    |-----------------------------------------
    */

    await prisma.pdf.update({

      where: {
        id: pdf.id,
      },

      data: {
        processingStatus:
          "COMPLETED",
      },
    });

    return pdf;
  };