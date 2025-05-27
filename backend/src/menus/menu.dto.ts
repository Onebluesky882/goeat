import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { menus } from '../database';

export type InsertMenu = InferInsertModel<typeof menus>;
export type SelectMenu = InferSelectModel<typeof menus>;

type pratialCreateMenu = Pick<
  InsertMenu,
  | 'name'
  | 'category'
  | 'createdBy'
  | 'description'
  | 'page'
  | 'price'
  | 'shopId'
  | 'available'
>;
