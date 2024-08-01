import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { motel } from "./motel";
import { relations } from "drizzle-orm";
import { booking } from "./booking";

export const guest = pgTable("guests", {
  id: uuid("id").primaryKey().defaultRandom(), // Using defaultRandom for UUID generation
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 15 }).notNull(),
  address: varchar("address", { length: 255 }),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  motelId: uuid("motel_id")
    .references(() => motel.id)
    .notNull(),
});

export const guestRelations = relations(guest, ({ one, many }) => ({
  motel: one(motel, { fields: [guest.motelId], references: [motel.id] }),
  bookings: many(booking),
}));
