CREATE TABLE IF NOT EXISTS "bookings" (
	"id" uuid PRIMARY KEY DEFAULT '6cb57e5d-434e-47e6-9783-e18dc8ab150c' NOT NULL,
	"guest_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"check_in_date" timestamp NOT NULL,
	"check_out_date" timestamp NOT NULL,
	"status" "booking_status" DEFAULT 'confirmed',
	"total_price" real NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"motel_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guests" (
	"id" uuid PRIMARY KEY DEFAULT '1c24b3e8-5463-4478-ba2f-2117ebac2b1d' NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"motel_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "motels" (
	"id" uuid PRIMARY KEY DEFAULT '5aeff2ba-ab8c-4581-9a37-bbfaba9905a8' NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"phone" text,
	"email" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room_service_requests" (
	"id" uuid PRIMARY KEY DEFAULT '195476df-c890-47aa-8786-f672244767c9' NOT NULL,
	"booking_id" uuid NOT NULL,
	"service_type" text NOT NULL,
	"request_details" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" uuid PRIMARY KEY DEFAULT 'c0d74d11-eae2-4f09-815d-70b9a2df1430' NOT NULL,
	"room_number" text NOT NULL,
	"type" text NOT NULL,
	"status" "room_status" DEFAULT 'available',
	"price_per_night" real NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"motel_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"id" uuid PRIMARY KEY DEFAULT '730cfb94-f418-4f7e-bb87-537e80e0688d' NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"role" "staff_role" DEFAULT 'receptionist',
	"created_at" timestamp DEFAULT now(),
	"motel_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_guest_id_guests_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."guests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_motel_id_motels_id_fk" FOREIGN KEY ("motel_id") REFERENCES "public"."motels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guests" ADD CONSTRAINT "guests_motel_id_motels_id_fk" FOREIGN KEY ("motel_id") REFERENCES "public"."motels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room_service_requests" ADD CONSTRAINT "room_service_requests_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms" ADD CONSTRAINT "rooms_motel_id_motels_id_fk" FOREIGN KEY ("motel_id") REFERENCES "public"."motels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staff" ADD CONSTRAINT "staff_motel_id_motels_id_fk" FOREIGN KEY ("motel_id") REFERENCES "public"."motels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
