import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { booking } from "./booking";
import { staff } from "./staff";
import { guest } from "./guest";
import { room } from "./room";
import { relations } from "drizzle-orm";

export const motel = pgTable("motels", {
  id: uuid("id").primaryKey().defaultRandom(), // Using defaultRandom for UUID generation
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const motelRelations = relations(motel, ({ many }) => ({
  rooms: many(room),
  guests: many(guest),
  staff: many(staff),
  bookings: many(booking),
}));
