import { axiosInstance } from ".";

export const users = {
  getUserById: async (id: string) => {
    return await axiosInstance.get(`/auth/${id}`);
  },
};
