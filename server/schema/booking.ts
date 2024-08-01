import { pgTable, uuid, date, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { guest } from "./guest";
import { room } from "./room";
import { motel } from "./motel";

import { relations } from "drizzle-orm";
import { roomServiceRequest } from "./roomServiceRequest";
export const bookingStatusEnum = pgEnum("booking_status", [
  "reserved",
  "checked_in",
  "checked_out",
  "cancelled",
]);

export const booking = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  guestId: uuid("guest_id")
    .references(() => guest.id)
    .notNull(),
  roomId: uuid("room_id")
    .references(() => room.id)
    .notNull(),
  motelId: uuid("motel_id")
    .references(() => motel.id)
    .notNull(),
  checkInDate: date("check_in_date").notNull(),
  checkOutDate: date("check_out_date").notNull(),
  status: bookingStatusEnum("status").default("reserved").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
export const bookingRelations = relations(booking, ({ one, many }) => ({
  guest: one(guest, { fields: [booking.guestId], references: [guest.id] }),
  room: one(room, { fields: [booking.roomId], references: [room.id] }),
  motel: one(motel, { fields: [booking.motelId], references: [motel.id] }),
  roomServiceRequests: many(roomServiceRequest),
}));
