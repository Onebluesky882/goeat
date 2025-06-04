import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <div className=" mx-4 flex flex-col">
      <Header />
      <TopBar />
      <Outlet />

      <Footer />
    </div>
  );
};
export default Layout;
