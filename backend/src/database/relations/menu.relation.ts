import { relations } from 'drizzle-orm';
import { menus } from '..';
import { shops } from '..';

//  menu reference shop
export const menuRelationShop = relations(menus, ({ one }) => ({
  shop: one(shops, {
    fields: [menus.shopId],
    references: [shops.id],
  }),
}));
