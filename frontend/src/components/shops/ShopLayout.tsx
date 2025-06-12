import useShop from "@/hooks/useShop";
import { Outlet } from "react-router-dom";
import MenuManagement from "./menu/MenuManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect } from "react";
import { shopAPI } from "@/Api/shop.api";

const ShopLayout = () => {
  const { selectShop, setShopById } = useShop();
  const pathName = window.location.pathname;
  const shopId = pathName.split("/shops/")[1];
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await shopAPI.getById(shopId);
        const shop = res.data;
        setShopById(shop);
      } catch (error) {
        console.error("Error fetching shop:");
      }
    };
    fetchShop();
  }, []);
  console.log("shopId ", shopId);
  console.log("selectShop: ", selectShop?.name);
  return (
    <div>
      <Outlet />
      <div>
        <div>
          <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
                {`ร้านอาหาร : ${selectShop?.name}` && "need login!"}
              </h1>

              <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
                <Tabs defaultValue="menu" className="w-full">
                  <TabsList className="flex flex-wrap justify-center gap-3 mb-6">
                    <TabsTrigger
                      value="menu"
                      className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      🍽 Add Menu
                    </TabsTrigger>
                    <TabsTrigger
                      value="live"
                      className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      📺 Live
                    </TabsTrigger>
                    <TabsTrigger
                      value="orders"
                      className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      🧾 Orders
                    </TabsTrigger>
                    <TabsTrigger
                      value="staff"
                      className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      👥 Staff
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      ⚙️ Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="menu">
                    <MenuManagement />
                  </TabsContent>
                  <TabsContent value="live">
                    <p className="text-gray-700">
                      🔴 Currently live stream placeholder
                    </p>
                  </TabsContent>
                  <TabsContent value="orders">
                    <p className="text-gray-700">
                      📦 Order management is coming soon.
                    </p>
                  </TabsContent>
                  <TabsContent value="staff">
                    <p className="text-gray-700">👥 Manage your staff here.</p>
                  </TabsContent>
                  <TabsContent value="settings">
                    <p className="text-gray-700">
                      ⚙️ Settings and configurations.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
export default ShopLayout;
