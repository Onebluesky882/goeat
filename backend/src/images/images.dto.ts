import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { images } from '../database';

export type InsertImage = InferInsertModel<typeof images>;
export type SelectImage = InferSelectModel<typeof images>;

export class ImageDto {
  type: 'menu' | 'shop' | 'profile';
  shopId?: string;
  menuId?: string;
}
