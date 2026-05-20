import prisma from "../config/db.js";

export const syncUser = async (clerkData) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: clerkData.id,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const user = await prisma.user.create({
    data: {
      clerkUserId: clerkData.id,
      email: clerkData.email_addresses[0].email_address,
      fullName: `${clerkData.first_name} ${clerkData.last_name}`,
      profileImage: clerkData.image_url,
    },
  });

  return user;
};