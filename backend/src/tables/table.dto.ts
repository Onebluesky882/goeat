import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { tables } from '../database';

export type InsertTable = InferInsertModel<typeof tables>;
export type ReadTables = InferSelectModel<typeof tables>;

export type UpdateTable = Pick<
  InsertTable,
  'name' | 'gridPosition' | 'status' | 'tableLink'
>;
