import { relations, sql } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { customers, shops } from '..';
import { orderTable } from './OrderTable';

export const orders = pgTable('orders', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shopId: uuid('shop_id'),
  orderTableId: uuid('order_table.id')
    .references(() => orderTable.id)
    .notNull(),
  quantity: numeric('quantity', { precision: 10, scale: 2 }),
  menuId: uuid('menu_id'),
  customerId: uuid('customer_id'),
  priceEach: numeric('price_each', { precision: 10, scale: 2 }),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// defined order column relation shop_id and customer_id
export const ordersRelation = relations(orders, ({ one }) => ({
  orderTable: one(orderTable, {
    fields: [orders.orderTableId],
    references: [orderTable.id],
  }),
  shop: one(shops, {
    fields: [orders.shopId],
    references: [shops.id],
  }),
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
}));
