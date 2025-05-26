import z from "zod";

export const signUpSchema = z
  .object({
    email: z.string(),
    name: z.string(),
    password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter"),
    confirmPassword: z.string(),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
