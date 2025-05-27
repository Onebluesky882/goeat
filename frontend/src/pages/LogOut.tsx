// src/pages/SignoutPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import { Button } from "@/components/ui/button";
import { FadeLoader } from "react-spinners";
const LogOut = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const profile = useUserStore((state) => state.user);
  const handleSignOut = () => {
    setLoading(true);

    setTimeout(() => {
      setUser(null);
      localStorage.removeItem("auth_token");
    }, 2000);
  };

  useEffect(() => {
    if (profile === null) {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-white px-4">
      <div
        className={`  rounded-2xl p-10 w-full max-w-md text-center ${
          loading ? "shadow-none bg-inherit" : "shadow-xl  bg-white"
        }`}
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Sign Out</h1>
        <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
        <Button
          onClick={handleSignOut}
          disabled={loading}
          className={`w-full cursor-pointer  text-white   ${
            loading ? "bg-inherit " : `bg-red-500`
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center h-5">
              <FadeLoader color="#292C34" height={5} width={3} />
            </div>
          ) : (
            "Sign Out"
          )}
        </Button>
      </div>
    </div>
  );
};

export default LogOut;
