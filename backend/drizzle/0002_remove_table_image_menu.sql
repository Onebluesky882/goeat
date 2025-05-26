ALTER TABLE "menu_images" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "menu_images" CASCADE;--> statement-breakpoint
ALTER TABLE "menus" ALTER COLUMN "photo_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "image_url" text;