import { useUserStore } from "@/stores/userStore";

import { useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const { fetchProfile } = useUserStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <header className="py-3 ">
      <div className="flex justify-around  items-center px-6  py-6 bg-white shadow-md rounded-xl outline-1 outline-gray-100 ">
        <div className="text-2xl font-semibold text-gray-800  text-center max-sm:mr-10     ">
          <span className="text-3xl">🍽️</span>
          <span className="text-indigo-600 text-3xl mx-2">
            <Link to={"/"}>MenuX</Link>{" "}
          </span>
        </div>

        <div className="flex gap-2   items-baseline  sm:gap-10">
          <div className="flex  text-center  flex-col max-sm:gap-y-5 ">
            <p className="text-gray-500 text-sm">Restaurant</p>
            <h3 className="text-sm sm:text-2xl font-bold text-gray-800 ">
              152
            </h3>
          </div>

          <div className="text-center flex justify-center flex-col">
            <p className="text-gray-500 text-sm">Real time Order</p>
            <h3 className="text-sm sm:text-2xl  font-bold text-emerald-600 ">
              ฿4,290
            </h3>
          </div>
          <div className="flex flex-col text-center  max-sm:gap-y-5  ">
            <p className="text-gray-500 text-sm">Summary</p>
            <h3 className="text-sm sm:text-2xl font-bold  text-emerald-600">
              ฿4,290
            </h3>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Today's Earnings</p>
            <h3 className="text-sm sm:text-2xl  font-bold text-emerald-600">
              ฿4,290
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
