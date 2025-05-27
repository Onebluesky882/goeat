import type { InsertMenu } from "../../backend/dist/src/menus/menu.dto";

export type PartialCreateMenu = Pick<
  InsertMenu,
  | "name"
  | "categoryId"
  | "createdBy"
  | "description"
  | "pageId"
  | "price"
  | "shopId"
  | "available"
>;
