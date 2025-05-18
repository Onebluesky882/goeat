import { relations } from 'drizzle-orm';
import { tables } from '../schema/tables';
import { shops } from '../schema/shops';
import { menuPhotos } from '../schema/menuPhoto';

export const tableRelationShop = relations(menuPhotos, ({ one }) => ({
  shop: one(shops, {
    fields: [menuPhotos.shopId],
    references: [shops.id],
  }),
}));
