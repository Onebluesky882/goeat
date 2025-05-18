import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tables = pgTable('tables', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name'),
  position: text('position'),
  url: text('url').notNull(),
  shopId: uuid('shop_id').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .notNull()
    .default(sql`now()`),
});

//const url = 'https://yourdomain.com/orderId to qr code';
