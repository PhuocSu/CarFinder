"use client"

import { atom } from "recoil";

type User = {
    role: "INDIVIDUAL" | "BUSINESS" | "AGENCY" | "ADMIN";
    // Add other user properties here as needed
    [key: string]: any;
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
};

//dùng recoil để lưu global session
export const authState = atom<AuthState>({
    key: "authState",
    default: {
        user: null,
        accessToken: null,
        isAuthenticated: false   
    }
})

