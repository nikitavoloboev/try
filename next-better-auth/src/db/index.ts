import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(
  process.env.NODE_ENV === "production"
    ? process.env.DIRECT_URL!
    : process.env.DATABASE_URL!
);
export const db = drizzle(client, { schema });
