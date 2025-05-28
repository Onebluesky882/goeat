import { InferInsertModel } from 'drizzle-orm';
import { pages } from '../database';
export type InsertPages = InferInsertModel<typeof pages>;

export type CreatePageDto = Pick<InsertPages, 'name'>;

export type UpdatePageDto = Pick<InsertPages, 'id' | 'name'>;
