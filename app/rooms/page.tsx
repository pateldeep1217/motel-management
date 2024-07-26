"use server";
import DataTable from "@/components/DataTable";
import { columns } from "./columns";
import { Room } from "@/types";

async function getData(): Promise<Room[]> {
  return [
    {
      id: "1",
      roomNumber: "101",
      type: "Single",
      status: "available",
      pricePerNight: 100,
      createdAt: "2024-07-01T14:48:00.000Z",
      motelID: "a1",
    },
    {
      id: "2",
      roomNumber: "102",
      type: "Double",
      status: "occupied",
      pricePerNight: 150,
      createdAt: "2024-07-02T14:48:00.000Z",
      motelID: "a1",
    },
    {
      id: "3",
      roomNumber: "103",
      type: "Suite",
      status: "maintenance",
      pricePerNight: 200,
      createdAt: "2024-07-03T14:48:00.000Z",
      motelID: "a2",
    },
    {
      id: "4",
      roomNumber: "104",
      type: "Single",
      status: "available",
      pricePerNight: 120,
      createdAt: "2024-07-04T14:48:00.000Z",
      motelID: "a2",
    },
    {
      id: "5",
      roomNumber: "105",
      type: "Double",
      status: "occupied",
      pricePerNight: 180,
      createdAt: "2024-07-05T14:48:00.000Z",
      motelID: "a3",
    },
    {
      id: "6",
      roomNumber: "106",
      type: "Suite",
      status: "available",
      pricePerNight: 250,
      createdAt: "2024-07-06T14:48:00.000Z",
      motelID: "a3",
    },
    {
      id: "7",
      roomNumber: "107",
      type: "Single",
      status: "maintenance",
      pricePerNight: 110,
      createdAt: "2024-07-07T14:48:00.000Z",
      motelID: "a4",
    },
    {
      id: "8",
      roomNumber: "108",
      type: "Double",
      status: "available",
      pricePerNight: 160,
      createdAt: "2024-07-08T14:48:00.000Z",
      motelID: "a4",
    },
    {
      id: "9",
      roomNumber: "109",
      type: "Suite",
      status: "occupied",
      pricePerNight: 220,
      createdAt: "2024-07-09T14:48:00.000Z",
      motelID: "a5",
    },
    {
      id: "10",
      roomNumber: "110",
      type: "Single",
      status: "available",
      pricePerNight: 130,
      createdAt: "2024-07-10T14:48:00.000Z",
      motelID: "a5",
    },
  ];
}

export default async function RoomsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Rooms</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
