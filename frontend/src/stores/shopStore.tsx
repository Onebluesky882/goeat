import { create } from "zustand";

type ShopStore = {
  shopId: string | null;
  shopName: string | null;
  setShop: (id: string, name: string) => void;
};

export const useShopStore = create<ShopStore>((set) => ({
  shopId: null, // init
  shopName: null, // init
  setShop: (id, name) => set({ shopId: id, shopName: name }),
}));
