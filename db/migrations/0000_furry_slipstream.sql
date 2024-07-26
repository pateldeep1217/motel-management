CREATE TABLE IF NOT EXISTS "bookings" (
	"id" uuid PRIMARY KEY NOT NULL,
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
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"motel_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "motels" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"phone" text,
	"email" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room_service_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"booking_id" uuid NOT NULL,
	"service_type" text NOT NULL,
	"request_details" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"room_number" text NOT NULL,
	"type" text NOT NULL,
	"status" "room_status" DEFAULT 'available',
	"price_per_night" real NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"motel_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"staff_role" "staff_role",
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
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bookings_guest_idx" ON "bookings" USING btree ("guest_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bookings_room_idx" ON "bookings" USING btree ("room_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guests_motel_idx" ON "guests" USING btree ("motel_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "motels_name_idx" ON "motels" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "room_service_requests_booking_idx" ON "room_service_requests" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rooms_motel_idx" ON "rooms" USING btree ("motel_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "staff_motel_idx" ON "staff" USING btree ("motel_id");