"use server";
import { db } from "@/server";

export default async function getRooms() {
  try {
    const rooms = await db.query.room.findMany();
    if (!rooms) {
      return { status: "error", message: "No rooms found" };
    }

    return { status: "sucess", data: rooms };
  } catch (error) {
    return { status: "error", message: "Failed to fetch rooms" };
  }
}
