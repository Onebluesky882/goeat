import { relations } from 'drizzle-orm';
import { customers, orders } from '..';
import { shops } from '..';

// defined order column relation shop_id and customer_id
export const ordersRelation = relations(orders, ({ one }) => ({
  shop: one(shops, {
    fields: [orders.shopId],
    references: [shops.id],
  }),
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
}));
