import { z } from "zod";
import { pgEnum } from "drizzle-orm/pg-core";

export const gender = pgEnum("gender", ["male", "female"]);

export const GenderSchema = z.string().refine(
  (val) => {
    return val === "male" || val === "female";
  },
  {
    message: "Gender must be either 'male' or 'female'",
  },
);

export type GenderValues = z.infer<typeof GenderSchema>;
