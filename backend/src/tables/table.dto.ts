import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { tables } from '../database';

export type InsetTables = InferInsertModel<typeof tables>;
export type ReadTables = InferSelectModel<typeof tables>;
