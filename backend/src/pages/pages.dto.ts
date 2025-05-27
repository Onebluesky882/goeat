import { InferInsertModel } from 'drizzle-orm';
import { pages } from '../database';
export type InsertPages = InferInsertModel<typeof pages>;

export class CreatePageDto {
  name: string;
  shopId: string;
}

// update-category.dto.ts
export class UpdatePageDto {
  name: string;
}
