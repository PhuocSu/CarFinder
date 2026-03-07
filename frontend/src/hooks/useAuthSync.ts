"use client";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "@/store/authStore.atom";

export const useAuthSync = () => {
  const auth = useRecoilValue(authState);

  useEffect(() => {
    // When auth state changes, dispatch event to notify other components
    window.dispatchEvent(new Event("authChanged"));
  }, [auth.isAuthenticated, auth.user?.sub]);

  useEffect(() => {
    // Listen for auth changes from other components (like login/logout)
    const handleAuthChange = () => {
      // This can be used to trigger additional actions when auth changes
      console.log("Auth state changed:", auth.isAuthenticated);
    };

    window.addEventListener("authChanged", handleAuthChange);
    
    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, [auth.isAuthenticated]);
};
