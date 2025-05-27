import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';

export const categories = pgTable('categories', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  shopId: uuid('shop_id').references(() => shops.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull(),
});
