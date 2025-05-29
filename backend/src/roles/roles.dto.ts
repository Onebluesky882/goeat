import { InferInsertModel } from 'drizzle-orm';
import { roles } from 'src/database';

export type InsertPages = InferInsertModel<typeof roles>;
