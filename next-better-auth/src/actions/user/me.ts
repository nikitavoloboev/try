"use server";

import { db } from "@/db";
import { user, UserType } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getMe(): Promise<UserType | null | undefined> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return null;
    }

    return await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });
  } catch (error) {
    console.error("GET_ME:", error);
    return null;
  }
}
