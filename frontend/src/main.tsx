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
import Controller from "./pages/Controller.tsx";
import LogOut from "./pages/LogOut.tsx";
import { Toaster } from "sonner";
import UserProfile from "./pages/UserProfile.tsx";
import FeedbackForm from "./pages/FeedbackForm.tsx";
import Feature from "./Feature/idea.tsx";
import Cctv from "./pages/shop/[shopId]/cctv/Cctv.tsx";
import StaffProfile from "./pages/shop/[shopId]/staff/[id].tsx";
import MenuManagement from "./pages/shop/[shopId]/menu/MenuManagement.tsx";
import DashBoard from "./pages/shop/[shopId]/dashboard/DashBoard.tsx";
import CreateNewShop from "./pages/shop/CreateShop.tsx";
import TableLayout from "./pages/shop/[shopId]/tableLayout/tableLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginAuthGoogle />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="profile" element={<UserProfile />} />

          {/* /shops */}
          <Route path="shops">
            <Route path="create" element={<CreateNewShop />} />

            {/* /shops/:shopId */}
            <Route path=":shopId" element={<Controller />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="dashboard/:orderId" element={<OrderStatus />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="orders" element={<OrderStatus />} />
              <Route path="orders/:orderId" element={<BillSummary />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="staff/:empId" element={<StaffProfile />} />
              <Route path="cctv" element={<Cctv />} />
              <Route path="layout" element={<Cctv />} />
              {/* …other nested routes… */}
            </Route>
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
