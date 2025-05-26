import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import BillSummary from "./pages/shop/[shopId]/dashboard/BillSummary.tsx";
import OrderStatus from "./pages/shop/[shopId]/orders/OrderStatus.tsx";
import StaffManagement from "./pages/shop/[shopId]/staff/StaffManagement.tsx";
import NotFound from "./pages/NotFound.tsx";
import LoginAuthGoogle from "./pages/LoginAuthGoogle.tsx";

import LogOut from "./pages/LogOut.tsx";
import { Toaster } from "sonner";
import UserProfile from "./pages/UserProfile.tsx";
import FeedbackForm from "./pages/FeedbackForm.tsx";
import Feature from "./Feature/idea.tsx";
import Cctv from "./pages/shop/[shopId]/cctv/Cctv.tsx";
import StaffProfile from "./pages/shop/[shopId]/staff/[id].tsx";
import DashBoard from "./pages/shop/[shopId]/dashboard/DashBoard.tsx";
import CreateNewShop from "./pages/shop/CreateShop.tsx";
import ShopsController from "./pages/shop/[shopId]/Controller.tsx";
import ShopCenter from "./pages/shop/ShopCenter.tsx";
import Controller from "./pages/Controller.tsx";
import TableLayout from "./pages/shop/TableLayout.tsx";

import MenuCreator from "./pages/menu/AddMenu.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginAuthGoogle />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="dashboard" element={<Controller />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="feature" element={<Feature />} />
          {/* /shops */}
          <Route path="shops" element={<ShopCenter />}>
            <Route path="create" element={<CreateNewShop />} />
            <Route path="add-menu" element={<MenuCreator />} />
            {/* /shops/:shopId */}
            <Route path=":shopId" element={<ShopsController />}>
              <Route path="table-layout" element={<TableLayout />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="dashboard/:orderId" element={<OrderStatus />} />
              {/*  <Route path="menu" element={<MenuManagement />} /> */}
              <Route path="orders" element={<OrderStatus />} />
              <Route path="orders/:orderId" element={<BillSummary />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="staff/:empId" element={<StaffProfile />} />

              <Route path="cctv" element={<Cctv />} />

              {/* …other nested routes… */}
            </Route>
          </Route>
          // will move to /:shopId/menu
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
