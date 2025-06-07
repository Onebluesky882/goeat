import { sql } from 'drizzle-orm';
import { numeric, pgTable, uuid } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { menus } from './menus';

export const orderItems = pgTable('order_items', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  orderId: uuid('order_id').references(() => orders.id, {
    onDelete: 'cascade',
  }),
  menuId: uuid('menu_id').references(() => menus.id),
  quantity: numeric('quantity', { precision: 10, scale: 2 }),
  priceEach: numeric('price_each', { precision: 10, scale: 2 }),
  totalPrice: numeric('total_price', { precision: 10, scale: 2 }),
});
