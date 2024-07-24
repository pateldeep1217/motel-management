import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  uuid,
  real,
  pgEnum,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { relations } from "drizzle-orm";

// Enums
const RoomStatusEnum = pgEnum("room_status", [
  "available",
  "occupied",
  "maintenance",
]);
const BookingStatusEnum = pgEnum("booking_status", [
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
]);
const StaffRoleEnum = pgEnum("staff_role", [
  "receptionist",
  "housekeeper",
  "manager",
]);

// Tables
export const motels = pgTable("motels", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rooms = pgTable("rooms", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  roomNumber: text("room_number").notNull(),
  type: text("type").notNull(),
  status: RoomStatusEnum("status").default("available"),
  pricePerNight: real("price_per_night").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  motelID: uuid("motel_id")
    .references(() => motels.id, { onDelete: "cascade" })
    .notNull(),
});

export const guests = pgTable("guests", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  motelID: uuid("motel_id")
    .references(() => motels.id, { onDelete: "cascade" })
    .notNull(),
});

export const staff = pgTable("staff", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: StaffRoleEnum("role").default("receptionist"),
  createdAt: timestamp("created_at").defaultNow(),
  motelID: uuid("motel_id")
    .references(() => motels.id, { onDelete: "cascade" })
    .notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  guestID: uuid("guest_id")
    .references(() => guests.id, { onDelete: "cascade" })
    .notNull(),
  roomID: uuid("room_id")
    .references(() => rooms.id, { onDelete: "cascade" })
    .notNull(),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  status: BookingStatusEnum("status").default("confirmed"),
  totalPrice: real("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  motelID: uuid("motel_id")
    .references(() => motels.id, { onDelete: "cascade" })
    .notNull(),
});

export const roomServiceRequests = pgTable("room_service_requests", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  bookingID: uuid("booking_id")
    .references(() => bookings.id, { onDelete: "cascade" })
    .notNull(),
  serviceType: text("service_type").notNull(),
  requestDetails: text("request_details"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const motelRelations = relations(motels, ({ many }) => ({
  rooms: many(rooms),
  guests: many(guests),
  staff: many(staff),
  bookings: many(bookings),
}));

export const roomRelations = relations(rooms, ({ one, many }) => ({
  motel: one(motels, { fields: [rooms.motelID], references: [motels.id] }),
  bookings: many(bookings),
}));

export const guestRelations = relations(guests, ({ one, many }) => ({
  motel: one(motels, { fields: [guests.motelID], references: [motels.id] }),
  bookings: many(bookings),
}));

export const staffRelations = relations(staff, ({ one }) => ({
  motel: one(motels, { fields: [staff.motelID], references: [motels.id] }),
}));

export const bookingRelations = relations(bookings, ({ one, many }) => ({
  guest: one(guests, { fields: [bookings.guestID], references: [guests.id] }),
  room: one(rooms, { fields: [bookings.roomID], references: [rooms.id] }),
  motel: one(motels, { fields: [bookings.motelID], references: [motels.id] }),
  roomServiceRequests: many(roomServiceRequests),
}));

export const roomServiceRequestRelations = relations(
  roomServiceRequests,
  ({ one }) => ({
    booking: one(bookings, {
      fields: [roomServiceRequests.bookingID],
      references: [bookings.id],
    }),
  })
);
