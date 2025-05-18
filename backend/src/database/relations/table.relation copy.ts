import { relations } from 'drizzle-orm';
import { tables } from '../schema/tables';
import { shops } from '../schema/shops';

export const tableRelationShop = relations(tables, ({ one }) => ({
  shop: one(shops, {
    fields: [tables.shopId],
    references: [shops.id],
  }),
}));
