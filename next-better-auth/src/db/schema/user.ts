import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { role } from "./role"

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  role: role("role").default("member").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export type UserType = typeof user.$inferSelect
