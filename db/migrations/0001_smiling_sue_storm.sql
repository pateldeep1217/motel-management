DO $$ BEGIN
 CREATE TYPE "public"."booking_status" AS ENUM('confirmed', 'checked_in', 'checked_out', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."staff_roles" AS ENUM('receptionist', 'housekeeper', 'manager');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"guestID" uuid NOT NULL,
	"roomID" uuid NOT NULL,
	"checkInDate" timestamp NOT NULL,
	"checkOutDate" timestamp NOT NULL,
	"status" "booking_status" DEFAULT 'confirmed',
	"totalPrice" real NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"address" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "motel_rooms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"motelID" uuid NOT NULL,
	"roomID" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "motels" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"phone" text,
	"email" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room_service_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"bookingID" uuid NOT NULL,
	"serviceType" text NOT NULL,
	"requestDetails" text,
	"status" text DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"role" "staff_roles" DEFAULT 'receptionist',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_guestID_guests_id_fk" FOREIGN KEY ("guestID") REFERENCES "public"."guests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_roomID_rooms_id_fk" FOREIGN KEY ("roomID") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "motel_rooms" ADD CONSTRAINT "motel_rooms_motelID_motels_id_fk" FOREIGN KEY ("motelID") REFERENCES "public"."motels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "motel_rooms" ADD CONSTRAINT "motel_rooms_roomID_rooms_id_fk" FOREIGN KEY ("roomID") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room_service_requests" ADD CONSTRAINT "room_service_requests_bookingID_bookings_id_fk" FOREIGN KEY ("bookingID") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
