import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  uuid,
  real,
  boolean,
  pgEnum,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { InferSelectModel, relations } from "drizzle-orm";

// Enum for room statuses
export const RoomStatusEnum = pgEnum("room_status", [
  "available",
  "occupied",
  "maintenance",
]);

// Enum for booking statuses
export const BookingStatusEnum = pgEnum("booking_status", [
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
]);

// Enum for staff roles
export const StaffRoleEnum = pgEnum("staff_roles", [
  "receptionist",
  "housekeeper",
  "manager",
]);

// Table for guests
export const guests = pgTable("guests", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Table for rooms
export const rooms = pgTable("rooms", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  roomNumber: text("roomNumber").notNull(),
  type: text("type").notNull(), // e.g., Single, Double, Suite
  status: RoomStatusEnum("status").default("available"),
  pricePerNight: real("pricePerNight").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Table for staff
export const staff = pgTable("staff", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: StaffRoleEnum("role").default("receptionist"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Table for bookings
export const bookings = pgTable("bookings", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  guestID: uuid("guestID")
    .notNull()
    .references(() => guests.id, { onDelete: "cascade" }),
  roomID: uuid("roomID")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
  checkInDate: timestamp("checkInDate").notNull(),
  checkOutDate: timestamp("checkOutDate").notNull(),
  status: BookingStatusEnum("status").default("confirmed"),
  totalPrice: real("totalPrice").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Table for room service requests
export const roomServiceRequests = pgTable("room_service_requests", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  bookingID: uuid("bookingID")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  serviceType: text("serviceType").notNull(), // e.g., Extra towels, Room cleaning
  requestDetails: text("requestDetails"),
  status: text("status").default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Table for motels
export const motels = pgTable("motels", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Table for rooms in motels
export const motelRooms = pgTable("motel_rooms", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  motelID: uuid("motelID")
    .notNull()
    .references(() => motels.id, { onDelete: "cascade" }),
  roomID: uuid("roomID")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
});

// Relations
export const guestRelations = relations(guests, ({ many }) => ({
  bookings: many(bookings, { relationName: "guest_bookings" }),
}));

export const roomRelations = relations(rooms, ({ many }) => ({
  bookings: many(bookings, { relationName: "room_bookings" }),
  motelRooms: many(motelRooms, { relationName: "room_motels" }),
}));

export const bookingRelations = relations(bookings, ({ one, many }) => ({
  guest: one(guests, {
    fields: [bookings.guestID],
    references: [guests.id],
    relationName: "guest_bookings",
  }),
  room: one(rooms, {
    fields: [bookings.roomID],
    references: [rooms.id],
    relationName: "room_bookings",
  }),
  roomServiceRequests: many(roomServiceRequests, {
    relationName: "booking_service_requests",
  }),
}));

export const roomServiceRequestRelations = relations(
  roomServiceRequests,
  ({ one }) => ({
    booking: one(bookings, {
      fields: [roomServiceRequests.bookingID],
      references: [bookings.id],
      relationName: "booking_service_requests",
    }),
  })
);

export const motelRelations = relations(motels, ({ many }) => ({
  motelRooms: many(motelRooms, { relationName: "motel_rooms" }),
}));

export const motelRoomRelations = relations(motelRooms, ({ one }) => ({
  motel: one(motels, {
    fields: [motelRooms.motelID],
    references: [motels.id],
    relationName: "room_motels",
  }),
  room: one(rooms, {
    fields: [motelRooms.roomID],
    references: [rooms.id],
    relationName: "motel_room",
  }),
}));
