import { InferInsertModel } from 'drizzle-orm';
import { employees } from 'src/database';

export type InsertPages = InferInsertModel<typeof employees>;
