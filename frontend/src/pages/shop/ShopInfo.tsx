// src/pages/ShopInfo.tsx
import { Outlet } from "react-router-dom";

const ShopInfo = () => {
  return (
    <div>
      <Outlet /> {/* This is required for nested routes to render */}
    </div>
  );
};

export default ShopInfo;
