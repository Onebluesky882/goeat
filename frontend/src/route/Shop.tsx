import { Route } from "react-router-dom";
import Controller from "../pages/shop/[shopId]/Controller";
import TableLayout from "../pages/shop/TableLayout";
import DashBoard from "../pages/shop/[shopId]/dashboard/DashBoard";
import OrderStatus from "../pages/shop/[shopId]/orders/OrderStatus";
import StaffManagement from "../pages/shop/[shopId]/staff/StaffManagement";
import Cctv from "../pages/shop/[shopId]/cctv/Cctv";
import MenuManagement from "../components/shops/menu/MenuManagement";
import CreateCategory from "@/pages/shop/[shopId]/CreateCategory";
import CreateNewShop from "@/pages/shop/CreateShop";
import Dashboard from "@/pages/Dashboard";
import ShopLayout from "@/components/shops/ShopLayout";

export const ShopRoute = (
  <>
    <Route path="shops">
      <Route path="create" element={<CreateNewShop />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="add-category" element={<CreateCategory />} />
      <Route path=":shopId" element={<ShopLayout />}>
        <Route path="tables" element={<TableLayout />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="orders" element={<OrderStatus />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="cctv" element={<Cctv />} />
      </Route>
    </Route>
  </>
);
