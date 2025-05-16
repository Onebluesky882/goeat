export type Shop = {
  id: string;
  name: string;
  ownerId: string | null;
  address: string | null;
  phone: string | null;
  createdAt: Date;
  active: boolean | null; // default แต่ไม่ได้ notNull → อาจ undefined
};
