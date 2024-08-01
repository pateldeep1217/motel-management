import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { booking } from "./booking";
import { relations } from "drizzle-orm";

export const roomServiceRequest = pgTable("room_service_requests", {
  id: uuid("id").primaryKey().defaultRandom(), // Using defaultRandom for UUID generation
  bookingId: uuid("booking_id")
    .references(() => booking.id)
    .notNull(),
  serviceType: varchar("service_type", { length: 50 }).notNull(),
  requestDetails: text("request_details"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
export const roomServiceRequestRelations = relations(
  roomServiceRequest,
  ({ one }) => ({
    booking: one(booking, {
      fields: [roomServiceRequest.bookingId],
      references: [booking.id],
    }),
  })
);
