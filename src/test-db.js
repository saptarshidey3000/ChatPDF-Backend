import "dotenv/config";

import prisma
from "./config/db.js";

const test = async () => {

  const pdf =
    await prisma.pdf.create({

      data: {

        id: "test-pdf-123",

        fileName: "test.pdf",

        originalName: "test.pdf",

        fileUrl: "https://example.com/test.pdf",

        fileSize: 1000,

        processingStatus: "COMPLETED",

        user: {

          create: {

            clerkUserId:
              "test-user",

            email:
              "test@test.com",
          },
        },
      },
    });

  console.log(pdf);
};

test();