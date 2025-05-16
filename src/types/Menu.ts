export type Menu = {
  id: string;
  shopId: string;
  name: string;
  description: string | null;
  category: string | null;
  price: string; // numeric() → string
  available: boolean | null; // default → nullable
  createdAt: Date;
};
