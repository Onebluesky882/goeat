import React from "react";
import { Home, Search, Heart, User, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

// interface BottomNavProps {
//   onShowQRFlyer: () => void;
// }

export const BottomNav = () => {
  return (
    <nav className="sticky bottom-0     ">
      <div className="flex items-center justify-around m-5 bg-white/50 backdrop-blur-md  drop-shadow-xs rounded-sm outline-1 outline-gray-150 shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center space-y-1 h-auto py-2"
        >
          <Home className="h-5 w-5 text-orange-500" />
          <span className="text-xs text-orange-500">Home</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center space-y-1 h-auto py-2"
        >
          <Search className="h-5 w-5 text-gray-400" />
          <span className="text-xs text-gray-400">Search</span>
        </Button>

        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg">
          <QrCode className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center space-y-1 h-auto py-2"
        >
          <Heart className="h-5 w-5 text-gray-400" />
          <span className="text-xs text-gray-400">Favorites</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center space-y-1 h-auto py-2"
        >
          <User className="h-5 w-5 text-gray-400" />
          <span className="text-xs text-gray-400">Profile</span>
        </Button>
      </div>
    </nav>
  );
};
