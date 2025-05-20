import { sql } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { orderTable } from './orderTable';
import { shops } from './shops';
import { menus } from './menus';
import { customers } from './customers';

export const orders = pgTable('orders', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shopId: uuid('shop_id').references(() => shops.id, { onDelete: 'cascade' }),
  menuId: uuid('menu_id').references(() => menus.id, { onDelete: 'cascade' }),
  orderTableId: uuid('order_table_id')
    .references(() => orderTable.id, { onDelete: 'cascade' })
    .notNull(),
  quantity: numeric('quantity', { precision: 10, scale: 2 }),

  customerId: uuid('customer_id').references(() => customers.id),
  priceEach: numeric('price_each', { precision: 10, scale: 2 }),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
