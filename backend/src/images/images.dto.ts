import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { images } from '../database';

export type InsertImage = InferInsertModel<typeof images>;
export type SelectImage = InferSelectModel<typeof images>;

export type UpdateImage = Pick<
  InsertImage,
  'imageName' | 'imageUrl' | 'type' | 'menuId'
>;
