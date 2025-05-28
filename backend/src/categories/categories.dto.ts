import { InferInsertModel } from 'drizzle-orm';
import { categories } from '../database';

export type InsertCategories = InferInsertModel<typeof categories>;

export type CreateCategoryDto = {
  name: string;
  shopId: string;
};

export type UpdateCategoryDto = {
  name: string;
};
