import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { menus } from '../database';

export type InsertMenu = InferInsertModel<typeof menus>;
export type SelectMenu = InferSelectModel<typeof menus>;
