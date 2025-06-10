import { api } from ".";
import type { CreateUserDto } from "../../../backend/src/users/user.dto";

export const userApi = {
  getProfile: () => api.get("users/profile"),
  create: (data: CreateUserDto) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout", {}, { withCredentials: true }),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data, { withCredentials: true }),
};
