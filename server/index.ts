import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/server/schema/index";

// Load and expand environment variables
config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema, logger: true });

export default db;
