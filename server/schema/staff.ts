import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./user"; // Import user model
import { motel } from "./motel"; // Import motel model
import { relations } from "drizzle-orm";

export const staffRoleEnum = pgEnum("staff_role", [
  "receptionist",
  "housekeeper",
  "manager",
]);

export const staff = pgTable("staff", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => user.id)
    .notNull(),
  motelId: uuid("motel_id")
    .references(() => motel.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }),
  role: staffRoleEnum("role").default("receptionist").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Define relations
export const staffRelations = relations(staff, ({ one }) => ({
  user: one(user, { fields: [staff.userId], references: [user.id] }),
  motel: one(motel, { fields: [staff.motelId], references: [motel.id] }),
}));
