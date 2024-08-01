import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import { motel } from "./motel";
import { relations } from "drizzle-orm";
import { booking } from "./booking";

export const roomStatusEnum = pgEnum("room_status", [
  "available",
  "occupied",
  "maintenance",
]);

export const room = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  motelId: uuid("motel_id")
    .references(() => motel.id)
    .notNull(),
  roomNumber: integer("room_number").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  status: roomStatusEnum("room_status").default("available").notNull(),
  pricePerNight: numeric("price_per_night", {
    precision: 12,
    scale: 2,
  }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
export const roomRelations = relations(room, ({ one, many }) => ({
  motel: one(motel, { fields: [room.motelId], references: [motel.id] }),
  bookings: many(booking),
}));
