"use client";
import React, { useState } from "react";
import { ExclusiveBanner } from "@/components/ExclusiveBanner";
import { FlashDealBanner } from "@/components/FlashDealBanner";
import { QuickActions } from "@/components/QuickActions";
import { TrendingMenu } from "@/components/TrendingMenu";
import { NewDealsSection } from "@/components/NewDealsSection";
import { CategoryTabs } from "@/components/CategoryTabs";
import { DailySpecial } from "@/components/DailySpecial";
import { LoyaltyTracker } from "@/components/LoyaltyTracker";
import { MenuCategories } from "@/components/MenuCategories";
import { PromoSection } from "@/components/PromoSection";
import { InviteFriends } from "@/components/InviteFriends";
import { QRFlyer } from "@/components/QrFlyer";
import { toast } from "sonner";
import { Sidebar } from "lucide-react";
const Homepage = () => {
  const [showQRFlyer, setShowQRFlyer] = useState(false);

  const handleQRScan = () => {
    toast("Opening camera to scan QR code...");
  };

  const handleQuickOrder = () => {
    toast("Loading your favorite items...");
  };

  const handleRepeatOrder = () => {
    toast("Adding your last order to cart...");
  };
  return (
    <>
      <main className=" bg-gradient-to-br from-orange-50 to-pink-50  border-1 border-gray-150 shadow-sm rounded-sm ">
        <div className="sm:w-120 md:w-220">
          {/* Exclusive App Banner */}
          <ExclusiveBanner />

          {/* Flash Deal Banner with Timer */}
          <FlashDealBanner />

          {/* Quick Actions */}
          <QuickActions
            onQRScan={handleQRScan}
            onQuickOrder={handleQuickOrder}
            onRepeatOrder={handleRepeatOrder}
          />

          {/* Trending Menu Section */}
          <TrendingMenu />

          {/* New & Big Deal Menus */}
          <NewDealsSection />

          {/* Category Tabs */}
          <CategoryTabs />

          {/* Daily Special */}
          <DailySpecial />

          {/* Loyalty Tracker */}
          <LoyaltyTracker points={1240} nextReward={1500} />

          {/* Menu Categories */}
          <MenuCategories />

          {/* Promo Section */}
          <PromoSection />

          {/* Invite Friends */}
          <InviteFriends />

          {/* QR Flyer Modal */}
          {showQRFlyer && <QRFlyer onClose={() => setShowQRFlyer(false)} />}
        </div>
      </main>
      <div>sidebar</div>
    </>
  );
};

export default Homepage;
