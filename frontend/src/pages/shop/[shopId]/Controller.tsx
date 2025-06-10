import useShop from "@/hooks/useShop";
import { Outlet } from "react-router-dom";

const Controller = () => {
  const { selectShop } = useShop();

  console.log("selectShop :", selectShop);

  return (
    <div>
      <Outlet />
      <h1>{selectShop?.name}</h1>
    </div>
  );
};
export default Controller;
