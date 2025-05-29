import { InferInsertModel } from 'drizzle-orm';
import { orderTable } from 'src/database';

export type InsertOrdersTable = InferInsertModel<typeof orderTable>;

export type CreateOrderTableDto = InsertOrdersTable;
