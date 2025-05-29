import { InferInsertModel } from 'drizzle-orm';
import { orderTable } from 'src/database';

export type InsertPages = InferInsertModel<typeof orderTable>;
