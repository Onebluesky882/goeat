import { Route } from "react-router-dom";
import ShopCenter from "../pages/shop/ShopCenter";
import CreateNewShop from "../pages/shop/CreateShop";
import Controller from "../pages/shop/[shopId]/Controller";
import TableLayout from "../pages/shop/TableLayout";
import DashBoard from "../pages/shop/[shopId]/dashboard/DashBoard";
import OrderStatus from "../pages/shop/[shopId]/orders/OrderStatus";
import StaffManagement from "../pages/shop/[shopId]/staff/StaffManagement";
import Cctv from "../pages/shop/[shopId]/cctv/Cctv";
import MenuManagement from "../pages/shop/[shopId]/menu/MenuManagement";
import CreateCategory from "@/pages/shop/CreateCategory";

export const Shop = () => (
  <>
    <Route path="shops" element={<ShopCenter />}>
      <Route path="create" element={<CreateNewShop />} />

      <Route path=":shopId" element={<Controller />}>
        <Route path="add-category" element={<CreateCategory />} />
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
