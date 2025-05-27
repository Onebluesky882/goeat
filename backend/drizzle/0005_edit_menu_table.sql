ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "menu_id" uuid;--> statement-breakpoint
ALTER TABLE "menus" ADD COLUMN "image_id" uuid;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_menu_id_images_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."images"("menu_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menus" ADD CONSTRAINT "menus_image_id_images_menu_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("menu_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menus" DROP COLUMN "photo_id";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");