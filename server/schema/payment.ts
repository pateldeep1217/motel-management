import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  decimal,
  numeric,
} from "drizzle-orm/pg-core";
import { booking } from "./booking";

export const payment = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(), // Using defaultRandom for UUID generation
  bookingId: uuid("booking_id")
    .references(() => booking.id)
    .notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(), // Changed to 'decimal'
  method: varchar("method", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
