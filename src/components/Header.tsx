import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md rounded-xl mx-4 my-4">
      <div className="text-2xl font-semibold text-gray-800 tracking-wide">
        🍽️ <span className="text-indigo-600 text-2xl">MyRestaurant</span>
      </div>

      <div className="flex gap-10 items-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h3 className="text-2xl font-bold text-gray-800">152</h3>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">Today's Earnings</p>
          <h3 className="text-2xl font-bold text-emerald-600">฿4,290</h3>
        </div>

        <Link to="/cctv">
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded-xl shadow transition">
            🔴 CCTV Live
          </button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
