import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { menus } from 'src/database';

export type MenuInsertDto = InferInsertModel<typeof menus>;
export type MenuReadDto = InferSelectModel<typeof menus>;
