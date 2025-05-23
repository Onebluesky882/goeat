import { sql } from 'drizzle-orm';
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { users } from './users';

export const menus = pgTable('menus', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shopId: uuid('shop_id')
    .notNull()
    .references(() => shops.id, { onDelete: 'cascade' }), // FK to shops.id
  createdBy: uuid('created_by').references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  photoId: uuid('photo_id'),
  category: text('category'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  available: boolean('available').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  page: text('page').notNull(),
});
