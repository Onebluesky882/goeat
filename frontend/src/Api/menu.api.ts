import { api } from ".";

export const menuApi = {
  create: (data: any) => api.post("/menus", data),
  getAll: () => api.get("/menus"),
  getById: (id: string) => api.get(`/menus/${id}`),
  update: (id: string, data: any) => api.put(`/menus/${id}`, data),
  delete: (id: string) => api.delete(`/menus/${id}`),
};
