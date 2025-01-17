import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(4, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password lenght at least 6 characters" }),
});

export type SignInValues = z.infer<typeof SignInSchema>;
