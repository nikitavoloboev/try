import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const { signIn, signUp, signOut, useSession, getSession } =
  createAuthClient({
    plugins: [usernameClient()],
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  });
