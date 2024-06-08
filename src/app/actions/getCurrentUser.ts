import { getSession } from "next-auth/react";
import { auth } from "auth";
import { db } from "~/server/db";

export default async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (err) {
    console.error(err);
    return null;
  }
}
