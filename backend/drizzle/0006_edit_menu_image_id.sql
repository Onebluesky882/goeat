ALTER TABLE "images" DROP CONSTRAINT "images_menu_id_images_menu_id_fk";
--> statement-breakpoint
ALTER TABLE "menus" DROP CONSTRAINT "menus_image_id_images_menu_id_fk";
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_menu_id_menus_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menus" DROP COLUMN "image_id";