ALTER TABLE "categories" ADD COLUMN "shop_id" uuid;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "shop_id" uuid;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;