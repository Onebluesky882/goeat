import { Button } from "@/components/ui/button";

const LoginAuthGoogle = () => {
  const handleLogin = () => {
    window.location.assign("http://localhost:3000/auth/google");
  };

  return (
    <div className="">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            เข้าสู่ระบบด้วย Google
          </h1>
          <Button onClick={handleLogin}>Login with Google</Button>
        </div>
      </div>
    </div>
  );
};
export default LoginAuthGoogle;
