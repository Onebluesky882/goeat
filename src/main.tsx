import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import BillSummary from "./pages/prepage/BillSummary.tsx";
import DashBoard from "./pages/prepage/DashBoard.tsx";
import MenuManagements from "./pages/prepage/MenuManagements.tsx";
import OrderStatus from "./pages/prepage/OrderStatus.tsx";
import StaffManagement from "./pages/prepage/StaffManagement.tsx";
import TableSetup from "./pages/prepage/TableSetup.tsx";
import NotFound from "./pages/NotFound.tsx";
import CCTVLive from "./pages/prepage/Cctv.tsx";
import LoginAuthGoogle from "./pages/LoginAuthGoogle.tsx";
import Profile from "./pages/Profile.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginAuthGoogle />} />
          <Route path="BillSummary" element={<BillSummary />} />
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="MenuManagements" element={<MenuManagements />} />
          <Route path="OrderStatus" element={<OrderStatus />} />
          <Route path="StaffManagement" element={<StaffManagement />} />
          <Route path="TableSetup" element={<TableSetup />} />
          <Route path="cctv" element={<CCTVLive />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
