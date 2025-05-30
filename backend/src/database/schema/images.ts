import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { users } from './users';
import { employees } from './employees';
import { menus } from './menus';

export const images = pgTable('images', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  imageName: text('image_name'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  type: text('type').notNull(), // e.g., 'menu' | 'shop' | 'profile'
  shopId: uuid('shop_id').references(() => shops.id, { onDelete: 'cascade' }),
  menuId: uuid('menu_id').references(() => menus.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
});
