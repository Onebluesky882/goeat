import { InferInsertModel } from 'drizzle-orm';
import { customers } from 'src/database';

export type InsertPages = InferInsertModel<typeof customers>;
