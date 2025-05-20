import { sql } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { customers } from './customers';

// order_tables – โต๊ะที่สั่งออเดอร์ (1 โต๊ะ = 1 กลุ่มออเดอร์)
export const orderTable = pgTable('order_table', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shopId: uuid('shop_id').references(() => shops.id, { onDelete: 'cascade' }),
  tableNumber: text('table_number'),
  customerId: uuid('customer_id').references(() => customers.id),
  totalPrice: numeric('total_price', { precision: 10, scale: 2 }),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
