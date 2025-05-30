import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { images } from '../database';

export type InsertImage = InferInsertModel<typeof images>;
export type SelectImage = InferSelectModel<typeof images>;

export type ImageDto = Pick<
  InsertImage,
  | 'userId'
  | 'imageName'
  | 'imageUrl'
  | 'type'
  | 'menuId'
  | 'imageUrl'
  | 'shopId'
>;
