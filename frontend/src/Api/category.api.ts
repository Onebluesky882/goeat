import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from "backend/dist/src/categories/categories.dto";
import { api } from ".";

export const category = {
  create: (data: CreateCategoryDto) => api.post("/categories/create", data),
  getAll: () => api.get("/categories"),
  getById: (id: string) => api.get(`/categories/${id}`),
  update: (id: string, data: UpdateCategoryDto) =>
    api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};
