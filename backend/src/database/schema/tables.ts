import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tables = pgTable('tables', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name'),
  gridPosition: text('grid_position'),
  tableLink: text('table_link').notNull(),
  shopId: uuid('shop_id').notNull(),
  rowsMap: text('rows_map'),
  columnsMap: text('columnsMap'),
  status: text('status').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
});

//const url = 'https://yourdomain.com/orderId to qr code';
