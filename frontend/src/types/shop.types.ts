import type { ShopSelect } from "../../../backend/dist/src/shops/shops.dto";
import type { ShopInsert } from "../../../backend/dist/src/shops/shops.dto";

export type PartialCreateShop = Pick<
  ShopSelect,
  | "name"
  | "ownerId"
  | "active"
  | "address"
  | "googleMaps"
  | "phone"
  | "website"
  | "updatedAt"
>;
