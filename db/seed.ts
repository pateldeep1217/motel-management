import { scehma } from "./schema";
import {
  generateMotelData,
  generateRoomData,
  generateGuestData,
  generateStaffData,
  generateBookingData,
  generateRoomServiceRequestData,
} from "./generateData";

const seedDatabase = async () => {
  const motelData = generateMotelData();
  const roomData = generateRoomData();
  const guestData = generateGuestData();
  const staffData = generateStaffData();
  const bookingData = generateBookingData();
  const roomServiceRequestData = generateRoomServiceRequestData();

  await scehma.motel.create({
    data: motelData,
  });
  await scehma.room.create({
    data: roomData,
  });
  await scehma.guest.create({
    data: guestData,
  });
  await scehma.staff.create({
    data: staffData,
  });
  await scehma.booking.create({
    data: bookingData,
  });
  await scehma.roomServiceRequest.create({
    data: roomServiceRequestData,
  });

  console.log("Database seeded successfully!");
};

seedDatabase().catch(console.error);
