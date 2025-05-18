import { relations, sql } from 'drizzle-orm';
import {
  foreignKey,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { orderTable } from '..';

export const orders = pgTable(
  'orders',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    shopId: uuid('shop_id'),
    orderTableId: uuid('order_table_id')
      .references(() => orderTable.id)
      .notNull(),

    quantity: numeric('quantity', { precision: 10, scale: 2 }),
    menuId: uuid('menu_id'),
    customerId: uuid('customer_id'),
    priceEach: numeric('price_each', { precision: 10, scale: 2 }),
    status: text('status').default('pending'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    foreignKey({
      name: 'orders_order_table_id_fk',
      columns: [table.orderTableId],
      foreignColumns: [orderTable.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  ],
);
