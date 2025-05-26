import type { CreateUser } from "frontend/types/user.types";
import { api } from ".";

export const authApi = {
  create: (data: CreateUser) => api.post("/auth/register", data),
};
