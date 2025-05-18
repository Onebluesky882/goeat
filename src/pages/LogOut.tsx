// src/pages/SignoutPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useStore";
import { Button } from "@/components/ui/button"; // ใช้ของ shadcn หรือเปลี่ยนเป็นปุ่มทั่วไป

const LogOut = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const handleSignOut = () => {
    // ล้างข้อมูลผู้ใช้ใน Store
    setUser(null);

    // ล้าง token ที่อาจเก็บใน localStorage (แล้วแต่ระบบ)
    localStorage.removeItem("auth_token");

    // เปลี่ยนหน้าไปหน้า login
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Sign Out</h1>
        <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
        <Button
          onClick={handleSignOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default LogOut;
