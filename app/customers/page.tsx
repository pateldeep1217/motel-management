// page.tsx
"use server";
import DataTable from "@/components/DataTable";
import { columns } from "./columns";
import { Guest } from "../../types/index"; // Adjust the path as necessary

async function getGuestData(): Promise<Guest[]> {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Elm St",
      createdAt: "2024-07-01T14:48:00.000Z",
      motelID: "a1",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Oak St",
      createdAt: "2024-07-02T14:48:00.000Z",
      motelID: "a2",
    },
    // Add more guest data as needed
  ];
}

export default async function GuestsPage() {
  const data = await getGuestData();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Guests</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
