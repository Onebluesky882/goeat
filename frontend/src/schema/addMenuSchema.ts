import z from "zod";

const itemMenu = z.object({
  name: z.string().min(1, "require"),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  page: z.string(),
  available: z.boolean(),
});

export const addMenuSchema = z.object({
  menuItems: z.array(itemMenu),
});
