import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // Explicitly specify the .env.local file

// Rest of your seed.ts code

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DB_SEEDING:", process.env.DB_SEEDING);
