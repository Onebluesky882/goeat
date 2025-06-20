import { menuApi } from "@/Api/menu.api";
import { useState } from "react";

export type Menu = {};
const useMenu = () => {
  const [menus, setMenus] = useState([]);
  const getAllMenu = async (shopId: string) => {
    const res = await menuApi.getAll(shopId);
    if (res) {
      const menuItems = res.data.map(() => ({}));

      setMenus([]);
    }
  };
  return {};
};
export default useMenu;
