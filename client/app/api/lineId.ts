import { LineUser } from "../types/lineUser";
import { axiosInstance } from ".";

export const postUserApi = (data: LineUser) => {
  axiosInstance.post("/line-users", data);
};
