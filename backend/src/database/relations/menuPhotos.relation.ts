import { relations } from 'drizzle-orm';
import { tables } from '../schema/tables';
import { shops } from '../schema/shops';
import { menuImages } from '../schema/menuImages';

export const tableRelationShop = relations(menuImages, ({ one }) => ({
  shop: one(shops, {
    fields: [menuImages.shopId],
    references: [shops.id],
  }),
}));
