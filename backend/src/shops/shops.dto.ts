import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { shops } from 'src/database';

export type ShopSelect = InferSelectModel<typeof shops>;
export type ShopInsert = InferInsertModel<typeof shops>;
