import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { shops } from '../database';

export type ShopSelect = InferSelectModel<typeof shops>;
export type ShopInsert = InferInsertModel<typeof shops>;

export type CreateShopDto = Pick<
  ShopInsert,
  | 'active'
  | 'address'
  | 'googleMaps'
  | 'name'
  | 'ownerId'
  | 'phone'
  | 'website'
  | 'socials'
>;

export type UpdateShopDto = Pick<
  ShopInsert,
  | 'active'
  | 'address'
  | 'googleMaps'
  | 'name'
  | 'ownerId'
  | 'phone'
  | 'updatedAt'
  | 'website'
  | 'socials'
>;
