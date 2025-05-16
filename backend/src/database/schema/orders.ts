import { sql } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shopId: uuid('shop_id'),
  orderItems: text('order_items')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  customerId: uuid('customer_id'),
  priceEach: numeric('price_each', { precision: 10, scale: 2 }),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
