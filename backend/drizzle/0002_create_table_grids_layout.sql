CREATE TABLE "table_grids_layout" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rows" text,
	"columns" text
);
--> statement-breakpoint
ALTER TABLE "tables" DROP COLUMN "rows_map";--> statement-breakpoint
ALTER TABLE "tables" DROP COLUMN "columns_map";