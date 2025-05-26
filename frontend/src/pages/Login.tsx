import LoginAuthGoogle from "../components/LoginAuthGoogle";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-10 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 rounded-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8 animate-fade-in">
        <LoginAuthGoogle title="LogIn With" />

        <h2 className="text-2xl font-bold my-6 text-gray-900 text-center tracking-tight">
          Sign in to your account
        </h2>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex items-center gap-2">
          <Link
            to="/signup"
            className="text-md text-gray-500 hover:text-blue-500 transition-colors underline underline-offset-2 float-left"
          >
            Signup
          </Link>{" "}
          <Link
            to="#"
            className="text-sm text-gray-400 hover:text-blue-500 transition-colors underline underline-offset-2 float-left"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
