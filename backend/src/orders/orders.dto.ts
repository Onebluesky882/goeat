import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { orders } from 'src/database';

export type InsertOrders = InferInsertModel<typeof orders>;
export type SelectOrders = InferSelectModel<typeof orders>;

export type UpdateOrder = Pick<
  InsertOrders,
  'updatedAt' | 'menuId' | 'quantity'
>;

export type CreateOrder = Pick<
  InsertOrders,
  | 'shopId'
  | 'customerId'
  | 'createdAt'
  | 'menuId'
  | 'orderTableId'
  | 'priceEach'
  | 'quantity'
  | 'status'
  | 'updatedAt'
>;
