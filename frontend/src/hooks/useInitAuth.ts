"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "@/store/authStore.atom";
import api from "@/lib/axios";

export const useInitAuth = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    // gắn token cho axios
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // decode hoặc gọi /me
    const payload = JSON.parse(atob(token.split(".")[1]));

    setAuth({
      user: payload,
      accessToken: token,
      isAuthenticated: true,
    });
  }, []);
};
