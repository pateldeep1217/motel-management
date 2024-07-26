import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import {
  MotelSchema,
  RoomSchema,
  GuestSchema,
  StaffSchema,
  BookingSchema,
  RoomServiceRequestSchema,
} from "../types/index";

const generateMotelData = () => {
  const motel = {
    id: uuidv4(),
    name: faker.company.name(),
    address: faker.location.streetAddress(), // Updated API
    phone: faker.phone.number(),
    email: faker.internet.email(),
    createdAt: new Date(),
  };

  return MotelSchema.parse(motel);
};

const generateRoomData = () => {
  const room = {
    id: uuidv4(),
    roomNumber: faker.datatype.number({ min: 100, max: 999 }).toString(),
    type: faker.helpers.arrayElement(["single", "double", "suite"]),
    status: faker.helpers.arrayElement([
      "available",
      "occupied",
      "maintenance",
    ]),
    pricePerNight: Number(faker.commerce.price({ min: 50, max: 500 })), // Updated API
    createdAt: new Date(),
    updatedAt: new Date(),
    motelID: uuidv4(),
  };

  return RoomSchema.parse(room);
};

const generateGuestData = () => {
  const guest = {
    id: uuidv4(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(), // Updated API
    createdAt: new Date(),
    motelID: uuidv4(),
  };

  return GuestSchema.parse(guest);
};

const generateStaffData = () => {
  const staff = {
    id: uuidv4(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: faker.helpers.arrayElement([
      "receptionist",
      "housekeeper",
      "manager",
    ]),
    createdAt: new Date(),
    motelID: uuidv4(),
  };

  return StaffSchema.parse(staff);
};

const generateBookingData = () => {
  const booking = {
    id: uuidv4(),
    guestID: uuidv4(),
    roomID: uuidv4(),
    checkInDate: new Date(faker.date.future()), // Ensure this is a Date object
    checkOutDate: new Date(faker.date.future()), // Ensure this is a Date object
    status: faker.helpers.arrayElement([
      "confirmed",
      "checked_in",
      "checked_out",
      "cancelled",
    ]),
    totalPrice: Number(faker.commerce.price({ min: 100, max: 1000 })), // Updated API
    createdAt: new Date(),
    motelID: uuidv4(),
  };

  return BookingSchema.parse(booking);
};

const generateRoomServiceRequestData = () => {
  const request = {
    id: uuidv4(),
    bookingID: uuidv4(),
    serviceType: faker.helpers.arrayElement([
      "cleaning",
      "maintenance",
      "room_service",
    ]),
    requestDetails: faker.lorem.sentence(),
    status: "pending",
    createdAt: new Date(),
  };

  return RoomServiceRequestSchema.parse(request);
};

export {
  generateMotelData,
  generateRoomData,
  generateGuestData,
  generateStaffData,
  generateBookingData,
  generateRoomServiceRequestData,
};
