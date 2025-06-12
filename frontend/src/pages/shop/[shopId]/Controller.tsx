import ShopLayout from "@/components/shops/ShopLayout";
import useShop from "@/hooks/useShop";
import { Link, Outlet } from "react-router-dom";

const Controller = () => {
  const { selectShop } = useShop();

  console.log("selectShop :", selectShop);

  return (
    <div>
      <h1>{selectShop?.name}</h1>
      <Link to={`/shops/${selectShop?.id}/menu`}>
        <button>add menu</button>
      </Link>
      <ShopLayout />
    </div>
  );
};
export default Controller;
