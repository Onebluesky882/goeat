export type Order = {
  id: string;
  shopId: string | null;
  orderItems: string[];
  customerId: string | null;
  priceEach: string | null; // Drizzle numeric maps to string
  status: string | null;
  createdAt: Date;
};
