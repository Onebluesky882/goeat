import type { InsertMenu } from "../../backend/dist/src/menus/menu.dto";

export type PartialCreateMenu = Pick<
  InsertMenu,
  | "name"
  | "categories"
  | "createdBy"
  | "description"
  | "pages"
  | "price"
  | "shopId"
  | "available"
>;
