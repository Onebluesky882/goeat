import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { users } from './users';

export const tables = pgTable('tables', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name'),
  gridPosition: text('grid_position'),
  tableLink: text('table_link').notNull(),
  shopId: uuid('shop_id')
    .notNull()
    .references(() => shops.id, { onDelete: 'cascade' }),
  status: text('status').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  createBy: uuid('create_by').references(() => users.id, {
    onDelete: 'cascade',
  }),
});

//const url = 'https://yourdomain.com/orderId to qr code';
