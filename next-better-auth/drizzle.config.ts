import { defineConfig } from "drizzle-kit"

console.log(process.env.DIRECT_URL!, "DIRECT_URL")

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db",
  dialect: "postgresql",
  dbCredentials: {
    // url: process.env.DIRECT_URL!,
    url: process.env.DATABASE_URL!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
})
