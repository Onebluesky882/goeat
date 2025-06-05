import type { CategoryDto } from "backend/dist/src/categories/categories.dto";
import { api } from ".";

export const category = {
  create: (data: CategoryDto) => api.post("/categories/create", data),
  getAll: () => api.get("/categories"),
  getById: (id: string) => api.get(`/categories/${id}`),
  update: (id: string, data: CategoryDto) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};
