import QuickActionOpenShop, {
  FeatureGrid,
} from "@/components/shops/newShop/QuickOpenShop";
import { useEffect } from "react";
import useShop from "@/hooks/useShop";
import { ShopCard } from "@/components/shops/dashboard/ShopListsCard";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { setAllShops, shops, selectShop, setShopById } = useShop();
  useEffect(() => {
    setAllShops();
  }, []);

  const navigate = useNavigate();
  const handleShopId = (id: string) => {
    const shop = shops.find((shop) => shop.id === id);
    if (!shop) return;
    setShopById(shop.id);
    navigate(`/shops/${id}`);
  };

  const shopLists = shops;

  return (
    <>
      {!Array.isArray(shops) ? (
        <div>
          <QuickActionOpenShop />
          <FeatureGrid />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-purple-50">
          <div className="container flex flex-col flex-1 py-8 max-w-4xl mx-auto w-full">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
              Dashboard
            </h1>

            {/* Analytics Section */}
            <section className="bg-white/80  rounded-2xl shadow-md p-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                <div>
                  <QuickActionOpenShop />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold font-playfair mb-1">
                    ร้านอาหารของคุณ
                  </h2>

                  {shopLists.map((shop) => (
                    <ShopCard
                      key={shop.id}
                      shop={{
                        id: shop.id,
                        name: shop.name,
                      }}
                      navigator={() => handleShopId(shop.id)}
                    />
                  ))}
                </div>
              </div>
            </section>
            <div className="flex-grow" />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
