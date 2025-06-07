// src/pages/ShopInfo.tsx
import { shopAPI } from "@/Api/shop.api";
import ShopBars from "@/components/shops/ShopBars";
import { useShopStore } from "@/stores/shopStore";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import CreateNewShop from "./[shopId]/ShopDetailForm";
export type ShopProp = {
  id: string;
  name: string;
};
const ShopCenter = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shops, setShops] = useState<ShopProp[]>([]);
  const { setShop } = useShopStore();
  const fetchShops = async () => {
    // todo
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      // crate shop //
      <Link to="/shops/create">สร้าง shop</Link>
      <div>
        <h2>ร้านของคุณ</h2>
      </div>
      <div>
        {Array.isArray(shops) &&
          shops.map((shop) => (
            <ShopBars id={shop.id} name={shop.name} setShop={setShop} />
          ))}
      </div>
      <Outlet key={location.pathname} />
    </div>
  );
};

export default ShopCenter;
