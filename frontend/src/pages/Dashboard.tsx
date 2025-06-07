import { BranchScroller } from "@/components/BranchScroller";
import QuickOpenShop from "@/components/shops/newShop/QuickOpenShop";
import React, { useState } from "react";
import { shopAPI } from "../Api/shop.api";
import { useShopStore } from "@/stores/shopStore";
import CreateFirstShop from "@/components/shops/newShop/QuickOpenShop";
import QuickActionOpenShop from "@/components/shops/newShop/QuickOpenShop";
const Dashboard = () => {
  const { shopName } = useShopStore();
  const branches = [
    "Restaurant 1",
    "Restaurant 2",
    "Restaurant 3",
    "Restaurant 4",
    "Restaurant 5",
    "Restaurant 6",
  ];
  console.log("shopName", shopName);
  const [selectedBranch, setSelectedBranch] = React.useState(branches[0]);

  return (
    <>
      {!Array.isArray(shopName) ? (
        <div>
          <QuickActionOpenShop />
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
                  <h2 className="text-xl md:text-2xl font-semibold font-playfair mb-1">
                    Data Analytics
                  </h2>
                  <p className="text-gray-500 text-sm">
                    See earnings and key stats for each branch.
                  </p>
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
