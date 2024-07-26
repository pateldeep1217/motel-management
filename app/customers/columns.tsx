"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "../../types/index";

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "id",
    header: "Guest ID",
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => {
      const createdAt = info.getValue<string>(); // Assert that the value is a string
      const formattedDate = new Date(createdAt).toLocaleDateString("en-US");
      return <div>{formattedDate}</div>;
    },
  },
];
