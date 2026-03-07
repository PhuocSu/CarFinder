"use client";

import { useRecoilState } from "recoil";
import { authState } from "@/store/authStore.atom";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    localStorage.removeItem("rememberMe");
    setAuth({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  };

  return {
    user: auth.user,
    accessToken: auth.accessToken,
    isAuthenticated: auth.isAuthenticated,
    logout,
  };
};
