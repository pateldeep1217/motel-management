import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ** Enums **
export const RoomStatusEnum = z.enum(["available", "occupied", "maintenance"]);

export const BookingStatusEnum = z.enum([
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
]);

export const StaffRoleEnum = z.enum(["receptionist", "housekeeper", "manager"]);

// ** Types **
export type RoomStatus = z.infer<typeof RoomStatusEnum>;
export type BookingStatus = z.infer<typeof BookingStatusEnum>;
export type StaffRole = z.infer<typeof StaffRoleEnum>;

// ** Schemas **

// Motel Schema
export const MotelSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  createdAt: z.date().default(() => new Date()),
});

export type Motel = z.infer<typeof MotelSchema>;

// Room Schema
export const RoomSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  roomNumber: z.string().min(1),
  type: z.string().min(1),
  status: RoomStatusEnum.default("available"),
  pricePerNight: z.number().positive(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  motelID: z.string().uuid(),
});

export type Room = z.infer<typeof RoomSchema>;

// Guest Schema
export const GuestSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  motelID: z.string().uuid(),
});

export type Guest = z.infer<typeof GuestSchema>;

// Staff Schema
export const StaffSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  role: StaffRoleEnum,
  createdAt: z.date().default(() => new Date()),
  motelID: z.string().uuid(),
});

export type Staff = z.infer<typeof StaffSchema>;

// Booking Schema
export const BookingSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  guestID: z.string().uuid(),
  roomID: z.string().uuid(),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  status: BookingStatusEnum.default("confirmed"),
  totalPrice: z.number().positive(),
  createdAt: z.date().default(() => new Date()),
  motelID: z.string().uuid(),
});

export type Booking = z.infer<typeof BookingSchema>;

// Room Service Request Schema
export const RoomServiceRequestSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  bookingID: z.string().uuid(),
  serviceType: z.string().min(1),
  requestDetails: z.string().optional(),
  status: z.string().default("pending"),
  createdAt: z.date().default(() => new Date()),
});

export type RoomServiceRequest = z.infer<typeof RoomServiceRequestSchema>;

// // ** Example Usage of Types and Schemas **
// const exampleMotel: Motel = {
//   id: uuidv4(),
//   name: "Grand Motel",
//   address: "123 Main St",
//   phone: "123-456-7890",
//   email: "info@grandmotel.com",
//   createdAt: new Date(),
// };

// const exampleRoom: Room = {
//   id: uuidv4(),
//   roomNumber: "101",
//   type: "suite",
//   status: "available",
//   pricePerNight: 150.0,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   motelID: exampleMotel.id,
// };
