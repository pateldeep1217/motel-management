import getRooms from "@/server/actions/rooms/get-rooms";
import { columns } from "./columns";
import { RoomSchemaType } from "@/types";

export default async function RoomsPage() {
  const response = await getRooms();

  if (response.status === "error") {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Rooms</h1>
        <p>{response.message}</p>
      </div>
    );
  }

  const data: RoomSchemaType[] = response.data ? response.data : [];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Rooms</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
