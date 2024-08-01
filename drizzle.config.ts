import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});
export default defineConfig({
  schema: "./server/schema/index.ts",
  out: "./server/migrations",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
