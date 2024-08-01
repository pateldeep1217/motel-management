import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Enum for Room Status
export const RoomStatusEnum = z.enum(["available", "occupied", "maintenance"]);

// Enum for Booking Status
export const BookingStatusEnum = z.enum([
  "reserved",
  "checked_in",
  "checked_out",
]);

// Enum for Staff Role
export const StaffRoleEnum = z.enum(["receptionist", "housekeeper", "manager"]);

// Helper function to generate unique email
function generateUniqueEmail(base: string) {
  return `${base}.${uuidv4()}@example.com`;
}

// Helper function to generate a unique password
function generateUniquePassword() {
  return uuidv4(); // For simplicity, use UUID as a password (in real scenarios, use a secure password generator)
}

export function generateMotelData() {
  return [
    {
      id: uuidv4(),
      name: "Grandview Inn",
      address: "123 Grandview St, Los Angeles, CA",
      phoneNumber: "+1-800-123-4567",
      email: "contact@grandviewinn.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Sunset Boulevard Hotel",
      address: "456 Sunset Blvd, Los Angeles, CA",
      phoneNumber: "+1-800-987-6543",
      email: "info@sunsetboulevardhotel.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Riverside Resort",
      address: "789 Riverside Ave, Riverside, CA",
      phoneNumber: "+1-800-555-1234",
      email: "reservations@riversideresort.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Mountain Peak Lodge",
      address: "321 Mountain Rd, Aspen, CO",
      phoneNumber: "+1-800-777-5555",
      email: "contact@mountainpeaklodge.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export function generateRoomData(motels: any[]) {
  return motels.flatMap((motel) => [
    {
      id: uuidv4(),
      motelId: motel.id,
      roomNumber: 101,
      type: "Deluxe",
      roomStatus: RoomStatusEnum.enum.available,
      pricePerNight: "150.00",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      motelId: motel.id,
      roomNumber: 102,
      type: "Standard",
      roomStatus: RoomStatusEnum.enum.maintenance,
      pricePerNight: "100.00",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
}

export function generateGuestData(motels: any[]) {
  return motels.flatMap((motel) => [
    {
      id: uuidv4(),
      firstName: "John",
      lastName: "Doe",
      email: generateUniqueEmail("john.doe"),
      phoneNumber: "+1-555-123-4567",
      address: "456 Elm Street, Los Angeles, CA",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      motelId: motel.id,
    },
    {
      id: uuidv4(),
      firstName: "Jane",
      lastName: "Smith",
      email: generateUniqueEmail("jane.smith"),
      phoneNumber: "+1-555-765-4321",
      address: "789 Maple Street, Riverside, CA",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      motelId: motel.id,
    },
  ]);
}

export function generateBookingData(
  rooms: any[],
  guests: any[],
  motels: any[]
) {
  return rooms.map((room) => ({
    id: uuidv4(),
    guestId:
      guests.find((guest) => guest.motelId === room.motelId)?.id || uuidv4(),
    roomId: room.id,
    motelId: room.motelId,
    checkInDate: new Date("2024-01-15").toISOString(),
    checkOutDate: new Date("2024-01-20").toISOString(),
    status: BookingStatusEnum.enum.reserved,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function generatePaymentData(bookings: any[]) {
  return bookings.map((booking) => ({
    id: uuidv4(),
    bookingId: booking.id,
    amount: "300.00",
    method: "credit_card",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function generateRoomServiceRequestData(bookings: any[]) {
  return bookings.map((booking) => ({
    id: uuidv4(),
    bookingId: booking.id,
    serviceType: "extra_towels",
    requestDetails: "Need additional towels in room",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function generateUserData(motels: any[]) {
  return motels.flatMap((motel) => [
    {
      id: uuidv4(),
      email: generateUniqueEmail("alice.johnson"),
      hashedPassword: generateUniquePassword(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: generateUniqueEmail("bob.brown"),
      hashedPassword: generateUniquePassword(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: generateUniqueEmail("carol.davis"),
      hashedPassword: generateUniquePassword(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: generateUniqueEmail("david.evans"),
      hashedPassword: generateUniquePassword(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
}

export function generateStaffData(motels: any[], users: any[]) {
  return motels.flatMap((motel, index) => [
    {
      id: uuidv4(),
      motelId: motel.id,
      userId: users[index * 4]?.id, // Assuming 4 users per motel
      name: "Alice Johnson",
      phoneNumber: "+1-555-765-4321",
      role: StaffRoleEnum.enum.receptionist,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      motelId: motel.id,
      userId: users[index * 4 + 1]?.id,
      name: "Bob Brown",
      phoneNumber: "+1-555-987-6543",
      role: StaffRoleEnum.enum.manager,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      motelId: motel.id,
      userId: users[index * 4 + 2]?.id,
      name: "Carol Davis",
      phoneNumber: "+1-555-543-2109",
      role: StaffRoleEnum.enum.housekeeper,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      motelId: motel.id,
      userId: users[index * 4 + 3]?.id,
      name: "David Evans",
      phoneNumber: "+1-555-678-9012",
      role: StaffRoleEnum.enum.receptionist,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
}
