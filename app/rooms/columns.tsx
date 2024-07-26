"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Room, RoomStatus } from "@/types"; // Adjust the path as necessary

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "roomNumber",
    header: "Room Number",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: RoomStatus = row.getValue("status");

      // Define styles for each status type
      const statusStyles: Record<RoomStatus, string> = {
        available: "bg-green-100 text-green-800",
        occupied: "bg-red-100 text-red-800",
        maintenance: "bg-yellow-100 text-yellow-800",
      };

      // Get the appropriate style based on the status
      const style = statusStyles[status] || "bg-gray-100 text-gray-800";

      return (
        <div className={`p-2 textce rounded ${style}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "pricePerNight",
    header: "Price Per Night",
    cell: ({ row }) => {
      const price: number = row.getValue("pricePerNight");
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div>{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      const formattedDate = new Date(createdAt).toLocaleDateString("en-US");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "motelID",
    header: "Motel ID",
  },
];
