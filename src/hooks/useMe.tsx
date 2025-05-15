import { api } from "@/Api/nestJsApi3000";
import { create } from "zustand";
type Me = {
  id: string;
  name: string;
};

type UserState = {
  me: Me | null;
  fetchMe: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  me: null,
  fetchMe: async () => {
    try {
      const res = await api.get("/auth/me");
      console.log("res : ", res);
      set({ me: res.data });
    } catch (error) {
      console.log("Failed to fetch me:", error);
      set({ me: null });
    }
  },
}));
