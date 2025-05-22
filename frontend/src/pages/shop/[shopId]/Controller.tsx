import { ShopAPI } from "@/Api/shop.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import type { ShopProp } from "../ShopCenter";

const ShopsController = () => {
  const [shopById, setShopById] = useState<ShopProp | null>(null);
  const { shopId } = useParams();

  const fetchShopId = async () => {
    try {
      if (!shopId) return;

      const { data } = await ShopAPI.getById(shopId);
      const shopName = data.data;
      if (shopName) {
        setShopById(shopName);
      }
    } catch (error) {
      console.error("Failed to fetch shop", error);
    }
  };

  useEffect(() => {
    fetchShopId();
  }, []);
  return (
    <div>
      <div>
        {shopById ? (
          <div className="">
            <h1>{shopById.name}</h1>{" "}
          </div>
        ) : (
          <PuffLoader color="#36d7b7" />
        )}
      </div>
    </div>
  );
};
export default ShopsController;
