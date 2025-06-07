import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Menu, CreditCard, Settings, User, LogOut } from "lucide-react";
import { ShopDetailsTab } from "@/components/dashboard/ShopDetailsTab";
import { MenuManagementTab } from "@/components/shops/dashboard/MenuManagementTabs";
import { PaymentTab } from "@/components/shops/dashboard/ShopDetail";

// todo
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Store className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Shop Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Manage Your Shop
          </h2>
          <p className="text-muted-foreground">
            Configure your shop details, menu, and payment settings
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="shop-details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="shop-details"
              className="flex items-center gap-2"
            >
              <Store size={16} />
              Shop Details
            </TabsTrigger>
            <TabsTrigger
              value="menu-management"
              className="flex items-center gap-2"
            >
              <Menu size={16} />
              Menu Management
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard size={16} />
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop-details">
            <ShopDetailsTab />
          </TabsContent>

          <TabsContent value="menu-management">
            <MenuManagementTab />
          </TabsContent>

          <TabsContent value="payment">
            <PaymentTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
