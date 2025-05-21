import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className=" mx-4 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
