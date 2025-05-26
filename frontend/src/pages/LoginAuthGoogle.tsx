import { Button } from "@/components/ui/button";

const LoginAuthGoogle = () => {
  const handleLogin = () => {
    window.location.assign("http://localhost:3000/auth/google");
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100  ">
    //   <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center space-y-6   -mt-50">

    //   </div>
    // </div>
    <div className="flex justify-between flex-col border-b-2 py-5">
      <h1 className="text-2xl font-bold text-gray-800 text-center py-2">
        Sign In With
      </h1>
      <Button onClick={handleLogin}>Google</Button>
    </div>
  );
};
export default LoginAuthGoogle;
