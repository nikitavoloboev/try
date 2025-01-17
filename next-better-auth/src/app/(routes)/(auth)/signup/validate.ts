import { z } from "zod";

const disallowedUsernamePatterns = [
  "admin",
  "superuser",
  "superadmin",
  "root",
  "jabirdev",
  "cakfan",
  "withcakfan",
];

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    name: z.string().min(4, { message: "Must be at least 4 characters" }),
    username: z
      .string()
      .min(4, { message: "Must be at least 4 characters" })
      .regex(/^[a-zA-Z0-0_-]+$/, "Only letters, numbers, - and _ allowed")
      .refine(
        (username) => {
          for (const pattern of disallowedUsernamePatterns) {
            if (username.toLowerCase().includes(pattern)) {
              return false;
            }
          }
          return true;
        },
        { message: "Username contains disallowed words" },
      ),
    password: z.string().min(8, {
      message: "Must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof SignUpSchema>;
