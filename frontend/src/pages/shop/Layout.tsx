// src/pages/ShopInfo.tsx
import { ShopAPI } from "@/Api/shop.api";
import ShopBars from "@/components/shops/ShopBars";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
export type ShopProp = {
  id: string;
  name: string;
};
const ShopLayout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shops, setShops] = useState<ShopProp[]>([]);
  const fetchShops = async () => {
    try {
      const res = await ShopAPI.getAll();
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
  console.log("shops :", shops);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <ShopBars shops={shops} />
      <Outlet /> {/* This is required for nested routes to render */}
    </div>
  );
};

export default ShopLayout;
