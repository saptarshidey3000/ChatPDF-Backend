import prisma from "../config/db.js";

import { getAuth } from "@clerk/express";

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {

    // Get Clerk auth data
    const { userId } = getAuth(req);

    // No authenticated user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    // User missing in DB
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {

    next(error);

  }
};

export default authMiddleware;