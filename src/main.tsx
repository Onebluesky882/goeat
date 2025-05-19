import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import BillSummary from "./pages/shop/BillSummary.tsx";
import OrderStatus from "./pages/shop/OrderStatus.tsx";
import StaffManagement from "./pages/shop/StaffManagement.tsx";
import TableSetup from "./pages/shop/TableSetup.tsx";
import NotFound from "./pages/NotFound.tsx";
import CCTVLive from "./pages/shop/Cctv.tsx";
import LoginAuthGoogle from "./pages/LoginAuthGoogle.tsx";
import Dashboard from "./pages/Controller.tsx";
import MenuManagement from "./pages/shop/MenuManagement.tsx";
import Controller from "./pages/Controller.tsx";
import LogOut from "./pages/LogOut.tsx";
import { Toaster } from "sonner";
import UserProfile from "./pages/UserProfile.tsx";
import FeedbackForm from "./pages/FeedbackForm.tsx";
import ShopInfo from "./pages/shop/ShopInfo.tsx";
import Feature from "./Feature/idea.tsx";
import TableLayoutManager from "./pages/shop/TableLayoutManager.tsx";
import TemTableLayout from "./pages/shop/TemTableLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginAuthGoogle />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="shop" element={<ShopInfo />}>
            <Route path="summary" element={<BillSummary />} />
            <Route path="table-layout" element={<TableLayoutManager />} />
            <Route path="OrderStatus" element={<OrderStatus />} />
            <Route path="StaffManagement" element={<StaffManagement />} />
            <Route path="TableSetup" element={<TableSetup />} />
            <Route path="cctv" element={<CCTVLive />} />
            <Route path="menus" element={<MenuManagement />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="temp" element={<TemTableLayout />} />
          </Route>

          <Route path="controller" element={<Controller />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="feature" element={<Feature />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
