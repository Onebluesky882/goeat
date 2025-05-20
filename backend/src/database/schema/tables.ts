import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';

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
  rowsMap: text('rows_map'),
  columnsMap: text('columns_map'),
  status: text('status').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
});

//const url = 'https://yourdomain.com/orderId to qr code';
