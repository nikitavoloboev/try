import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password lenght at least 6 characters" }),
})

export type SignInValues = z.infer<typeof SignInSchema>
