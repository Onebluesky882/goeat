import { shopAPI } from "@/Api/shop.api";
import type { NewShopFormField } from "@/schema/newShopForm";
import { useShopStore, type Shop } from "@/GlobalContext/shopStore";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const useShop = () => {
  const { setShops, setSelectedShop } = useShopStore();

  const createShop = async (data: NewShopFormField) => {
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

  const setAllShops = async () => {
    const res = await shopAPI.getAll();
    setShops(res.data.data);
  };

  const setShopById = async (id: string) => {
    const res = await shopAPI.getById(id);
    const shopId = res.data.data;
    setSelectedShop(shopId);
  };

  const shops = useShopStore((state) => state.shops);
  const selectShop = useShopStore((state) => state.selectedShop);
  const clearSelectedShop = useShopStore(() => null);

  return {
    setAllShops,
    setShopById,
    createShop,
    shops,
    selectShop,
    clearSelectedShop,
  };
};
export default useShop;
