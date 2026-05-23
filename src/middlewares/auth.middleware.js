import prisma from "../config/db.js";

import { verifyToken }
from "@clerk/backend";

const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    /*
    |-----------------------------------------
    | Extract Bearer Token
    |-----------------------------------------
    */

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token =
      authHeader.split(" ")[1];

    /*
    |-----------------------------------------
    | Verify Clerk JWT
    |-----------------------------------------
    */

    const payload =
      await verifyToken(
        token,
        {
          secretKey:
            process.env
              .CLERK_SECRET_KEY,
        }
      );

    const clerkUserId =
      payload.sub;

    if (!clerkUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    /*
    |-----------------------------------------
    | Find/Create User
    |-----------------------------------------
    */

    let user =
      await prisma.user.findUnique({
        where: {
          clerkUserId,
        },
      });

    if (!user) {

      user =
        await prisma.user.create({
          data: {

            clerkUserId,

            email:
              payload.email || "",

            fullName:
              payload.fullName ||
              "User",
          },
        });
    }

    req.user = user;

    next();

  } catch (error) {

    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;