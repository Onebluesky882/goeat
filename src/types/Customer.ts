export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
  active: boolean | null;
};
