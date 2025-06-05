CREATE TABLE "user_fcm_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_table" DROP CONSTRAINT "order_table_share_token_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_table" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "order_table" ADD COLUMN "create_by_id" uuid;--> statement-breakpoint
ALTER TABLE "order_table" ADD COLUMN "order_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "shop_id" uuid;--> statement-breakpoint
ALTER TABLE "tables" ADD COLUMN "shop_id" uuid;--> statement-breakpoint
ALTER TABLE "tables" ADD COLUMN "created_by_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "nickname" text;--> statement-breakpoint
ALTER TABLE "user_fcm_tokens" ADD CONSTRAINT "user_fcm_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_table" ADD CONSTRAINT "order_table_create_by_id_users_id_fk" FOREIGN KEY ("create_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tables" ADD CONSTRAINT "tables_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tables" ADD CONSTRAINT "tables_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_table" DROP COLUMN "share_token";--> statement-breakpoint
ALTER TABLE "order_table" ADD CONSTRAINT "order_table_token_unique" UNIQUE("token");--> statement-breakpoint
ALTER TABLE "order_table" ADD CONSTRAINT "order_table_order_code_unique" UNIQUE("order_code");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_id_unique" UNIQUE("order_id");