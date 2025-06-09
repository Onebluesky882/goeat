import { LineUser } from "../types/lineUser";
import { axiosInstance } from ".";

export const postUserApi = {
  post: (data: LineUser) => axiosInstance.post("/line-users", data),
  getById: (id: string) => axiosInstance.get(`/line-users/${id}`),
};
