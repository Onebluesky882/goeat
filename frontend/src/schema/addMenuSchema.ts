import z from "zod";

const itemMenu = z.object({
  name: z.string().min(1, "require"),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  page: z.string(),
  available: z.boolean(),
});

export const schema = z.object({
  name: z
    .string()
    .min(1, "require")
    .transform((val) => val.trim()),
  price: z.number().min(1, "require"),
});

export const addMenuSchema = z.object({
  menuItems: z.array(itemMenu),
});

export type QuickAddMenu = z.infer<typeof schema>;
