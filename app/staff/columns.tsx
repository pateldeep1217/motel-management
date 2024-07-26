"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Staff } from "@/types";

export const staffColumns: ColumnDef<Staff>[] = [
  {
    accessorKey: "id",
    header: "Staff ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
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
