// src/pages/ShopInfo.tsx
import { shopAPI } from "@/Api/shop.api";
import ShopBars from "@/components/shops/ShopBars";
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

  useEffect(() => {
    fetchShops();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {shops && <ShopBars shops={shops} />}
      <Outlet key={location.pathname} />
    </div>
  );
};

export default ShopCenter;
