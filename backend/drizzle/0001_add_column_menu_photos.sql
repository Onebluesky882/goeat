CREATE TABLE "menu_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"url" text,
	"shop_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
