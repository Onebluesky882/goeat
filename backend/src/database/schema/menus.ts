import { sql } from 'drizzle-orm';
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const menus = pgTable('menus', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shopId: uuid('shop_id').notNull(), // FK to shops.id
  name: text('name').notNull(),
  description: text('description'),
  images: text('images')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  category: text('category'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  available: boolean('available').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
