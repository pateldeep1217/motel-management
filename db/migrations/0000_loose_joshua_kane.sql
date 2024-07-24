DO $$ BEGIN
 CREATE TYPE "public"."room_status" AS ENUM('available', 'occupied', 'maintenance');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"roomNumber" text NOT NULL,
	"type" text NOT NULL,
	"status" "room_status" DEFAULT 'available',
	"pricePerNight" real NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
