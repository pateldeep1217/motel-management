// actions.ts
import { RoomSchema } from "@/types";

export async function createRoom(roomData: unknown) {
  try {
    const parsedData = RoomSchema.parse(roomData);
    // Proceed with database operations using parsedData
  } catch (error) {
    console.error("Invalid room data:", error);
    throw new Error("Failed to create room: Invalid data");
  }
}
