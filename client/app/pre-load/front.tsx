"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
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
import { BottomNav } from "@/components/ButtonNav";
import { toast } from "sonner";
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Header />

      <main className="pb-20">
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
      </main>

      <BottomNav onShowQRFlyer={() => setShowQRFlyer(true)} />
    </div>
  );
};

export default Homepage;
