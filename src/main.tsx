import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import BillSummary from "./pages/shop/BillSummary.tsx";
import DashBoard from "./pages/shop/DashBoard.tsx";
import OrderStatus from "./pages/shop/OrderStatus.tsx";
import StaffManagement from "./pages/shop/StaffManagement.tsx";
import TableSetup from "./pages/shop/TableSetup.tsx";
import NotFound from "./pages/NotFound.tsx";
import CCTVLive from "./pages/shop/Cctv.tsx";
import LoginAuthGoogle from "./pages/LoginAuthGoogle.tsx";
import Profile from "./pages/Profile.tsx";
import Dashboard from "./pages/shop/DashBoard.tsx";
import MenuManagement from "./pages/shop/MenuManagement.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginAuthGoogle />} />
          <Route path="BillSummary" element={<BillSummary />} />
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="OrderStatus" element={<OrderStatus />} />
          <Route path="StaffManagement" element={<StaffManagement />} />
          <Route path="TableSetup" element={<TableSetup />} />
          <Route path="cctv" element={<CCTVLive />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop/menus" element={<MenuManagement />} />
          <Route path="shop/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
