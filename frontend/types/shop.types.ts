import type { ShopSelect } from "../../backend/src/shops/shops.dto";

export type ShopDto = Pick<
  ShopSelect,
  "name" | "ownerId" | "active" | "updatedAt"
>;

export type StoreType = "retail" | "restaurant" | "bar" | null;
