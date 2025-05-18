import { relations } from 'drizzle-orm';
import { orders } from '../schema/orders';
import { shops } from '../schema/shops';
import { customers } from '../schema/customers';
import { orderTable } from '..';

// defined order column relation shop_id and customer_id

//  .onDelete('cascade')  // ถ้าโต๊ะถูกลบ ออร์เดอร์ในโต๊ะนี้ก็ลบตาม
// .onUpdate('cascade')  // ถ้า orderTable.id ถูกเปลี่ยน จะอัปเดต orderTableId ใน orders ให้อัตโนมัติ
export const ordersRelation = relations(orders, ({ one }) => ({
  orderTable: one(orderTable, {
    fields: [orders.orderTableId],
    references: [orderTable.id],
  }),
  shop: one(shops, {
    fields: [orders.shopId],
    references: [shops.id],
  }),
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
}));
