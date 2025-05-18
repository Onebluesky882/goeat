import { customers } from './schema/customers';
import { menus } from './schema/menus';
import { orders } from './schema/orders';
import { shops } from './schema/shops';
import { tables } from './schema/tables';
import { users } from './schema/users';
import { menuPhotos } from './schema/menuPhoto';

export * from './schema/orders';
export * from './schema/menus';
export * from './schema/shops';
export * from './schema/users';
export * from './schema/customers';
export * from './schema/tables';
export * from './schema/menuPhoto';

export * from './relations/orders.relation';
export * from './relations/owner.relation';
export * from './relations/menu.relation';
export * from './relations/menuPhotos.relation';

export const schema = {
  users,
  orders,
  menus,
  shops,
  customers,
  tables,
  menuPhotos,
};
