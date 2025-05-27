// src/pages/ShopInfo.tsx
import { shopAPI } from "@/Api/shop.api";
import ShopBars from "@/components/shops/ShopBars";
import { useShopStore } from "@/stores/shopStore";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
export type ShopProp = {
  id: string;
  name: string;
};
const ShopCenter = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shops, setShops] = useState<ShopProp[]>([]);
  const { setShop, shopId, shopName } = useShopStore();
  const fetchShops = async () => {
    try {
      const res = await shopAPI.getAll();
      if (res) {
        setShops(res.data);
      }
    } catch (error) {
      setError("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };
  // array shops
  // todo
  useEffect(() => {
    fetchShops();
  }, []);
  console.log("shopId", shopId);
  console.log("shopName", shopName);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {shops &&
        shops.map((shop) => (
          <ShopBars id={shop.id} name={shop.name} setShop={setShop} />
        ))}
      <Outlet key={location.pathname} />
    </div>
  );
};

export default ShopCenter;
