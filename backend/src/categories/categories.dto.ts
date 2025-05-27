import { InferInsertModel } from 'drizzle-orm';
import { categories } from '../database';

export type InsertCategories = InferInsertModel<typeof categories>;

export class CreateCategoryDto {
  name: string;
  shopId: string;
}

// update-category.dto.ts
export class UpdateCategoryDto {
  name: string;
}
