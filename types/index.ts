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
export const Motel = z.object({
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

export type Motel = z.infer<typeof Motel>;

// Room Schema
export const roomSchema = z.object({
  id: z.string().uuid(),
  motelId: z.string().uuid(),
  roomNumber: z.number(),
  type: z.string().max(50),
  status: z.enum(["available", "occupied", "maintenance"]),
  pricePerNight: z.string().transform((value) => parseFloat(value)),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RoomSchemaType = z.infer<typeof roomSchema>;
// Guest Schema
export const Guest = z.object({
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

export type Guest = z.infer<typeof Guest>;

// Staff Schema
export const Staff = z.object({
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

export type Staff = z.infer<typeof Staff>;

// Booking Schema
export const Booking = z.object({
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

export type Booking = z.infer<typeof Booking>;

// Room Service Request Schema
export const RoomServiceRequest = z.object({
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

export type RoomServiceRequest = z.infer<typeof RoomServiceRequest>;

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
