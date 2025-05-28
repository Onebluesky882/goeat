import { api } from ".";
import {
  CreatePageDto,
  UpdatePageDto,
} from "../../../backend/src/pages/pages.dto";
// main @Controller('pages')
// get()
// create
//edit :id
// Delete :id
// Get :id

export const pages = {
  create: (data: CreatePageDto) => api.post("/pages", data),
  getAll: () => api.get("/pages"),
  getById: (id: string) => api.get(`/pages/${id}`),
  update: (id: string, data: UpdatePageDto) => api.patch(`/pages/${id}`, data),
  delete: (id: string) => api.delete(`/pages/${id}`),
};
