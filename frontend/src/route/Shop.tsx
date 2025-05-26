import { Route } from "react-router-dom";
import ShopCenter from "../pages/shop/ShopCenter";
import CreateNewShop from "../pages/shop/CreateShop";
import MenuCreator from "../pages/menu/AddMenu";
import ShopsController from "../pages/shop/[shopId]/Controller";
import TableLayout from "../pages/shop/TableLayout";
import DashBoard from "../pages/shop/[shopId]/dashboard/DashBoard";
import OrderStatus from "../pages/shop/[shopId]/orders/OrderStatus";
import BillSummary from "../pages/shop/[shopId]/dashboard/BillSummary";
import StaffManagement from "../pages/shop/[shopId]/staff/StaffManagement";
import StaffProfile from "../pages/shop/[shopId]/staff/[id]";
import Cctv from "../pages/shop/[shopId]/cctv/Cctv";

export const Shop = () => (
  <>
    <Route path="shops" element={<ShopCenter />}>
      <Route path="create" element={<CreateNewShop />} />
      <Route path="add-menu" element={<MenuCreator />} />
      <Route path=":shopId" element={<ShopsController />}>
        <Route path="table-layout" element={<TableLayout />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="dashboard/:orderId" element={<OrderStatus />} />
        <Route path="orders" element={<OrderStatus />} />
        <Route path="orders/:orderId" element={<BillSummary />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="staff/:empId" element={<StaffProfile />} />
        <Route path="cctv" element={<Cctv />} />
      </Route>
    </Route>
  </>
);
