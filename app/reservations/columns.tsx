"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Booking, BookingStatus } from "@/types"; // Adjust the path as necessary

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "guestID",
    header: "Guest ID",
  },
  {
    accessorKey: "roomID",
    header: "Room ID",
  },
  {
    accessorKey: "checkInDate",
    header: "Check-In Date",
    cell: ({ row }) => {
      const checkInDate: string = row.getValue("checkInDate");
      const formattedDate = new Date(checkInDate).toLocaleDateString("en-US");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "checkOutDate",
    header: "Check-Out Date",
    cell: ({ row }) => {
      const checkOutDate: string = row.getValue("checkOutDate");
      const formattedDate = new Date(checkOutDate).toLocaleDateString("en-US");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: BookingStatus = row.getValue("status");

      // Define styles for each status type
      const statusStyles: Record<BookingStatus, string> = {
        confirmed: "bg-blue-100 text-blue-800",
        checked_in: "bg-green-100 text-green-800",
        checked_out: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800",
      };

      // Get the appropriate style based on the status
      const style = statusStyles[status] || "bg-gray-100 text-gray-800";

      return (
        <div className={`p-2 text-center rounded ${style}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const totalPrice: number = row.getValue("totalPrice");
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalPrice);
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
];
