import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { menus } from 'src/database';

export type MenuInsertDto = InferInsertModel<typeof menus>;
export type MenuReadDto = InferSelectModel<typeof menus>;

export type UpdateMenuDto = Pick<
  MenuInsertDto,
  | 'id'
  | 'name'
  | 'price'
  | 'categoryId'
  | 'available'
  | 'createdBy'
  | 'description'
  | 'pageId'
>;
