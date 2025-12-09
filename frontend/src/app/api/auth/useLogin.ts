"use client"

import {useMutation} from "@tanstack/react-query"
import api from "@/lib/axios"

interface LoginData {
    username: string;
    password: string;
}

export function useLogin() {
    return useMutation({
        mutationFn: async(data: LoginData) => {
            const response = await api.post("/auth/login", data)
            return response.data
        }
    })
}