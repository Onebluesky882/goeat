import z from "zod";
export const newShopSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  googleMaps: z.string().optional(),
  website: z.string().optional(),
  socials: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  }),
});
