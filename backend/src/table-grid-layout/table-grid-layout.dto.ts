import { InferInsertModel } from 'drizzle-orm';
import { tableGridLayout } from 'src/database';

export type InsertTableGridLayout = InferInsertModel<typeof tableGridLayout>;
