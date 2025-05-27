import z from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .transform((val) => val.trim()),
});

export type CategoryField = z.infer<typeof schema>;
