import { userApi } from "@/Api/user.api";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useUsers = () => {
  const { setUser } = useUserStore.getState();
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  const profile = useUserStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile()]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await userApi.login({ email, password });
    try {
      if (response.data.status === "success") {
        navigate("/dashboard");
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logoutUser = async () => {
    await userApi.logout();
    localStorage.removeItem("auth_token");
    setUser(null);

    const channel = new BroadcastChannel("user-session");
    channel.postMessage({ type: "SET_USER", user: null });
  };
  return { logoutUser, profile, login };
};
export default useUsers;
