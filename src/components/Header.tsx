import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md rounded-xl mx-4 my-4">
      <div className="text-2xl font-semibold text-gray-800 tracking-wide">
        🍽️ <span className="text-indigo-600 text-2xl">GoEat</span>
      </div>

      <div className="flex gap-5 items-center justify-center outline-1 ">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Restaurant</p>
          <h3 className="text-2xl font-bold text-gray-800">152</h3>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">Real time Order</p>
          <h3 className="text-2xl font-bold text-emerald-600">฿4,290</h3>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Summary</p>
          <h3 className="text-2xl font-bold text-emerald-600">฿4,290</h3>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Today's Earnings</p>
          <h3 className="text-2xl font-bold text-emerald-600">฿4,290</h3>
        </div>
      </div>
    </header>
  );
};
export default Header;
