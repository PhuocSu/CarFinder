"use client"

import { atom } from "recoil";

//dùng recoil để lưu global session
export const authState = atom({
    key: "authState",
    default: {
        user: null,
        accessToken: null,
        isAuthenticated: false   
    }
})

