import z from "zod";
export const newShopSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .transform((vel) => vel.trim()),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .transform((val) => val.trim())
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone must contain only numbers",
    }),
  googleMaps: z
    .string()
    .transform((vel) => vel.trim())
    .optional(),
  website: z
    .string()
    .transform((vel) => vel.trim())
    .optional(),
  socials: z.object({
    facebook: z
      .string()
      .transform((vel) => vel.trim())
      .optional(),
    instagram: z
      .string()
      .transform((vel) => vel.trim())
      .optional(),
    youtube: z
      .string()

      .transform((vel) => vel.trim())
      .optional(),
    tiktok: z
      .string()
      .transform((vel) => vel.trim())
      .optional(),
  }),
});

export type NewShopFormField = z.infer<typeof newShopSchema>;
