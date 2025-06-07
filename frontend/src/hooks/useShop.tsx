import { shopAPI } from "@/Api/shop.api";
import type { NewShopFormField } from "@/schema/newShopForm";
import { useShopStore } from "@/stores/shopStore";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const useShop = () => {
  const { setShop } = useShopStore();
  useEffect(() => {
    const fetchShops = async () => {
      const res = await shopAPI.getAll();
      const { id, name } = res.data;
      setShop(id, name);
    };
    fetchShops();
  }, []);

  const updateShopDetail = async (data: NewShopFormField) => {
    try {
      const response = await shopAPI.create(data);
      if (response.data) {
        toast.success("✅ Shop created successfully!");
        return response.data;
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ?? "An unknown error occurred.";

      toast.error(`❌ Failed to create shop: ${errorMessage}`);
      return null;
    }
  };
  return { updateShopDetail };
};

export default useShop;
