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

/*
|-----------------------------------------
| Upload PDF Service
|-----------------------------------------
*/

export const uploadPdfService =
  async ({
    file,
    userId,
  }) => {

    try {

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

                  if (error) {

                    reject(error);

                  } else {

                    resolve(result);
                  }
                }
              );

            streamifier
              .createReadStream(
                file.buffer
              )
              .pipe(stream);
          }
        );

      console.log(
        "\nPDF UPLOADED TO CLOUDINARY\n"
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

      console.log(
        "\nPDF SAVED TO DATABASE\n"
      );

      /*
      |-----------------------------------------
      | Extract PDF Text
      |-----------------------------------------
      */

      const extractedText =
        await extractPdfText(
          file.buffer
        );

      console.log(
        "\nTEXT LENGTH:\n",
        extractedText?.length
      );

      console.log(
        "\nEXTRACTED TEXT SAMPLE:\n",
        extractedText?.slice(0, 1000)
      );

      /*
      |-----------------------------------------
      | Validate Extracted Text
      |-----------------------------------------
      */

      if (
        !extractedText ||
        extractedText.trim().length === 0
      ) {

        throw new Error(
          "No text extracted from PDF"
        );
      }

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

      console.log(
        "\nTOTAL CHUNKS:\n",
        chunks.length
      );

      console.log(
        "\nFIRST CHUNK:\n",
        chunks[0]
      );

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

      console.log(
        "\nVECTORS STORED SUCCESSFULLY\n"
      );

      /*
      |-----------------------------------------
      | Update Processing Status
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

      console.log(
        "\nPDF PROCESSING COMPLETED\n"
      );

      return pdf;

    } catch (error) {

      console.error(
        "\nUPLOAD PDF SERVICE ERROR:\n",
        error
      );

      throw error;
    }
  };