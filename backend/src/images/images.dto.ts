import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { images } from '../database';

export type InsertMenu = InferInsertModel<typeof images>;
export type SelectMenu = InferSelectModel<typeof images>;
