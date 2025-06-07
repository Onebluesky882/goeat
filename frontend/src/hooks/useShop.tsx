import { shopAPI } from "@/Api/shop.api";
import type { NewShopFormField } from "@/schema/newShopForm";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const useShop = () => {
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
