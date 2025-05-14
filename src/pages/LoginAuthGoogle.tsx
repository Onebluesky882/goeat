import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";

const LoginAuthGoogle = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/login";
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          เข้าสู่ระบบด้วย Google
        </h1>
        <Button onClick={handleLogin}>Login with Google</Button>
      </div>
    </div>
  );
};
export default LoginAuthGoogle;
