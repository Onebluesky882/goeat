import { customers } from './schema/customer';
import { menus } from './schema/menus';
import { orders } from './schema/orders';
import { shops } from './schema/shops';
import { users } from './schema/users';

export * from './schema/orders';
export * from './schema/menus';
export * from './schema/shops';
export * from './schema/users';
export * from './schema/customer';

export * from './relations/orders.relation';
export * from './relations/owner.relation';
export * from './relations/menu.relation';

export const schema = {
  users,
  orders,
  menus,
  shops,
  customers,
};
