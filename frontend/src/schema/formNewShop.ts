import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  address: z.string().optional(),
  phone: z.string().optional(),
  googleMaps: z.string().url("Invalid URL").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  socials: z.object({
    facebook: z
      .string()
      .transform((val) => {
        // If empty string, return as-is
        if (!val) return val;
        // Add https:// if it's missing
        if (!/^https?:\/\//i.test(val)) {
          return `https://${val}`;
        }
        return val;
      })
      .refine(
        (val) => {
          // Accept empty string
          if (!val) return true;
          try {
            const url = new URL(val);
            return url.protocol === "https:";
          } catch {
            return false;
          }
        },
        {
          message: "Must be a valid https:// URL",
        }
      )
      .optional()
      .or(z.literal("")),

    instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  }),
});
