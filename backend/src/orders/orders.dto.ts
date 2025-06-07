import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { orders } from 'src/database';

export type InsertOrders = InferInsertModel<typeof orders>;
export type SelectOrders = InferSelectModel<typeof orders>;

export type UpdateOrderDto = Pick<
  InsertOrders,
  'updatedAt' | 'quantity' | 'status' | 'totalPrice'
>;

export type CreateOrderDto = Pick<
  InsertOrders,
  | 'shopId'
  | 'customerId'
  | 'createdById'
  | 'createdAt'
  | 'orderTableId'
  | 'priceEach'
  | 'quantity'
  | 'status'
  | 'updatedAt'
  | 'totalPrice'
>;
