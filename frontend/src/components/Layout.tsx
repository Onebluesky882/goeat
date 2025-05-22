import { Outlet, useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const { shopId } = useParams();
  return (
    <div className=" mx-4 ">
      <Header />
      <Outlet />
      <Footer shopId={shopId as string} />
    </div>
  );
};
export default Layout;
