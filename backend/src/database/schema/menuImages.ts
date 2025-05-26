import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';
// will delete
export const menuImages = pgTable('menu_images', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  imageName: text('image_name'),
  imageUrl: text('image_url').notNull(),
  shopId: uuid('shop_id')
    .references(() => shops.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
