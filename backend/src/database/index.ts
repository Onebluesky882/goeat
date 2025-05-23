import { customers } from './schema/customers';
import { menus } from './schema/menus';
import { orders } from './schema/orders';
import { shops } from './schema/shops';
import { tables } from './schema/tables';
import { users } from './schema/users';
import { orderTable } from './schema/orderTable';
import { images } from './schema/images';
import { menuImages } from './schema/menuImages';
import { roles } from './schema/roles';
import { employees } from './schema/employees';

export * from './schema/orders';
export * from './schema/menus';
export * from './schema/shops';
export * from './schema/users';
export * from './schema/customers';
export * from './schema/tables';
export * from './schema/menuImages';
export * from './schema/orderTable';
export * from './schema/images';
export * from './schema/roles';
export * from './schema/employees';

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
  orderTable,
  employees,
  images,
  menuImages,
  roles,
};
