import { create } from "zustand";

type User = {
  id: string;
  linePictureUrl: string;
  lineDisplayName: string;
};
type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchProfile: (id: string) => Promise<void>;
  clearUserSate: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => {
    set({ user });
  },
  fetchProfile: async (id) => {
    try {
      // const res = await users.getUserById(id);
      // set({ user: res.data });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  },

  clearUserSate: () => {
    set({ user: null });
  },
}));
