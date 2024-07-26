"use server";
import DataTable from "@/components/DataTable";
import { Room, columns } from "./columns";

async function getData(): Promise<Room[]> {
  // Fetch data from your API here. For now, let's use dummy data.
  return [
    {
      id: "1",
      roomNumber: "101",
      type: "Single",
      status: "available",
      pricePerNight: 100,
      createdAt: "2023-07-25T14:48:00.000Z",
      motelID: "a1",
    },
    {
      id: "2",
      roomNumber: "102",
      type: "Double",
      status: "occupied",
      pricePerNight: 150,
      createdAt: "2023-07-25T14:48:00.000Z",
      motelID: "a1",
    },
    // Add more rooms as needed
  ];
}

export default async function RoomsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
