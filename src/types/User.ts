export type User = {
  id: string;
  email: string;
  name: string | null;
  createAt: Date;
  active: boolean | null; // ไม่มี `.notNull()` → อาจ undefined/null
  role: string | null;
};
