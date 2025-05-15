import { api } from "@/Api/nestJsApi3000";
import { useUserStore } from "@/hooks/useMe";
import { useEffect, useState } from "react";

const Header = () => {
  const [users, setUsers] = useState<any[]>([]);
  const me = useUserStore((state) => state.me);
  const fetchMe = useUserStore((state) => state.fetchMe);

  const getProfiles = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };
  useEffect(() => {
    fetchMe();
    getProfiles();
  }, []);

  const profile = users.find((user) => user.id === me?.id);

  return (
    <header className="flex justify-around  items-center px-6   py-6 bg-white shadow-md rounded-xl mx-4 my-4">
      <div className="text-2xl font-semibold text-gray-800  text-center max-sm:mr-10     ">
        <span className="text-3xl">🍽️</span>
        <span className="text-indigo-600 text-3xl mx-2">GoEat</span>
      </div>
      {profile ? <h1>{profile.name}</h1> : "hello"}

      <div className="flex gap-2   items-baseline  sm:gap-10">
        <div className="flex  text-center  flex-col max-sm:gap-y-5 ">
          <p className="text-gray-500 text-sm">Restaurant</p>
          <h3 className="text-sm sm:text-2xl font-bold text-gray-800 ">152</h3>
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
    </header>
  );
};
export default Header;
