ALTER TABLE "orders" DROP CONSTRAINT "orders_order_table.id_order_table_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_table_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_table_id_order_table_id_fk" FOREIGN KEY ("order_table_id") REFERENCES "public"."order_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_table_id_fk" FOREIGN KEY ("order_table_id") REFERENCES "public"."order_table"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "order_table.id";