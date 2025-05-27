import type { InsertCategories } from "../../backend/dist/src/categories/categories.dto";

export type PartialCreateMenu = Pick<
  InsertCategories,
  "name" | "shopId" | "userId"
>;
