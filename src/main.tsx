import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import BillSummary from "./pages/BillSummary.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import MenuManagements from "./pages/MenuManagements.tsx";
import OrderStatus from "./pages/OrderStatus.tsx";
import StaffManagement from "./pages/StaffManagement.tsx";
import TableSetup from "./pages/TableSetup.tsx";
import NotFound from "./pages/NotFound.tsx";
import CCTVLive from "./pages/Cctv.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="BillSummary" element={<BillSummary />} />
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="MenuManagements" element={<MenuManagements />} />
          <Route path="OrderStatus" element={<OrderStatus />} />
          <Route path="StaffManagement" element={<StaffManagement />} />
          <Route path="TableSetup" element={<TableSetup />} />
          <Route path="cctv" element={<CCTVLive />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
