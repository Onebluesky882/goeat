import { api } from "@/Api";
import { create } from "zustand";
type User = {
  id: string;
  name: string;
  email: string;
  pictureUrl?: string;
  displayname?: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchProfile: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => {
  const channel = new BroadcastChannel("user-session");

  channel.onmessage = (event) => {
    if (event.data?.type === "SET_USER") {
      const current = get().user;
      const incoming = event.data.user;
      if (current?.id !== incoming?.id) {
        set({ user: incoming });
      }
    }
  };

  return {
    user: null,
    setUser: (user) => {
      const current = get().user;

      if (current?.id !== user?.id) {
        set({ user });
        channel.postMessage({ type: "SET_USER", user });
      }
    },
    fetchProfile: async () => {
      try {
        const res = await api.get("/auth/profile", {
          withCredentials: true,
        });

        const user = res.data.user;
        console.log("user : ", user);
        const current = get().user;
        if (current?.id !== user?.id) {
          set({ user });
          channel.postMessage({ type: "SET_USER", user });
        }
      } catch {
        set({ user: null });
        channel.postMessage({ type: "SET_USER", user: null });
      }
    },
  };
});
