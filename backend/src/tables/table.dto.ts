import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { tables } from '../database';

export type InsertTable = InferInsertModel<typeof tables>;
export type ReadTables = InferSelectModel<typeof tables>;

export type TableDto = Pick<
  InsertTable,
  | 'layoutId'
  | 'name'
  | 'number'
  | 'position'
  | 'status'
  | 'tableLink'
  | 'createdById'
  | 'shopId'
>;
