import db from "@/server/index";
import { motel } from "./schema/motel";
import { room } from "./schema/room";
import { guest } from "./schema/guest";
import { booking } from "./schema/booking";
import { payment } from "./schema/payment";
import { roomServiceRequest } from "./schema/roomServiceRequest";
import { staff } from "./schema/staff";
import { user } from "./schema/user";
import {
  generateMotelData,
  generateRoomData,
  generateGuestData,
  generateBookingData,
  generatePaymentData,
  generateRoomServiceRequestData,
  generateStaffData,
  generateUserData,
} from "./generateData";

async function seed() {
  try {
    // Generate data
    const motels = generateMotelData();

    const rooms = generateRoomData(motels);
    const guests = generateGuestData(motels);
    const bookings = generateBookingData(rooms, guests, motels);
    const payments = generatePaymentData(bookings);
    const roomServiceRequests = generateRoomServiceRequestData(bookings);
    const users = generateUserData(motels);
    const staffMembers = generateStaffData(motels, users);

    // Insert data into the database
    await db.insert(motel).values(motels);
    console.log("Motel data inserted");

    await db.insert(user).values(users);
    console.log("User data inserted");

    await db.insert(room).values(rooms);
    console.log("Room data inserted");

    await db.insert(guest).values(guests);
    console.log("Guest data inserted");

    await db.insert(booking).values(bookings);
    console.log("Booking data inserted");

    await db.insert(payment).values(payments);
    console.log("Payment data inserted");

    await db.insert(roomServiceRequest).values(roomServiceRequests);
    console.log("Room service request data inserted");

    await db.insert(staff).values(staffMembers);
    console.log("Staff data inserted");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

async function runSeeds() {
  try {
    await seed();
    console.log("Seeding completed");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

runSeeds();
