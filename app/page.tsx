import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import {
  generateRoomData,
  generateMotelData,
  generateGuestData,
  generateStaffData,
  generateBookingData,
  generateRoomServiceRequestData,
} from "../db/generateData";

export default function Home() {
  const roomData = generateRoomData(10);
  const motelData = generateMotelData();
  const guestData = generateGuestData();
  const staffData = generateStaffData();
  const bookingData = generateBookingData();
  const roomServiceRequestData = generateRoomServiceRequestData();
  return (
    <div className="">
      <h1>Generated Data</h1>
      <h2>Room Data</h2>
      <pre>{JSON.stringify(roomData, null, 2)}</pre>
      <h2>Motel Data</h2>
      <pre>{JSON.stringify(motelData, null, 2)}</pre>
      <h2>Guest Data</h2>
      <pre>{JSON.stringify(guestData, null, 2)}</pre>
      <h2>Staff Data</h2>
      <pre>{JSON.stringify(staffData, null, 2)}</pre>
      <h2>Booking Data</h2>
      <pre>{JSON.stringify(bookingData, null, 2)}</pre>
      <h2>Room Service Request Data</h2>
      <pre>{JSON.stringify(roomServiceRequestData, null, 2)}</pre>
    </div>
  );
}
