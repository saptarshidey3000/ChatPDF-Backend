import prisma from "../config/db.js";

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {

    const clerkUserId =
      req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    /*
    |-----------------------------------------
    | Find Existing User
    |-----------------------------------------
    */

    let user =
      await prisma.user.findUnique({
        where: {
          clerkUserId,
        },
      });

    /*
    |-----------------------------------------
    | Auto Create User
    |-----------------------------------------
    */

    if (!user) {

      user =
        await prisma.user.create({
          data: {
            clerkUserId,

            email:
              req.auth.sessionClaims
                ?.email || "",

            fullName:
              req.auth.sessionClaims
                ?.fullName || "User",
          },
        });

      console.log(
        "New user created"
      );
    }

    req.user = user;

    next();

  } catch (error) {
    next(error);
  }
};

export default authMiddleware;