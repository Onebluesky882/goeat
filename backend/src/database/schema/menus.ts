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
import { pages } from './pages';
import { categories } from './categories';
import { images } from './images';

export const menus = pgTable('menus', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  // FK to shops.id
  createdBy: uuid('created_by').references(() => users.id),
  name: text('name').notNull().unique(),
  description: text('description'),
  categoryId: uuid('category_id').references(() => categories.id),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  available: boolean('available').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  pageId: uuid('page_id').references(() => pages.id),
  imageId: uuid('image_id').references(() => images.id),
  shopId: uuid('shop_id')
    .notNull()
    .references(() => shops.id, { onDelete: 'cascade' }),
});
