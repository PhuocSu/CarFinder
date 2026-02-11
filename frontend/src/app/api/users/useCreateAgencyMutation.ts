"use client";

import api from "@/lib/axios";
import { CreateAgencyData } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const useCreateAgencyMutation = () => {
  const queryClient = useQueryClient();

  const createAgency = async (data: CreateAgencyData) => {
    const response = await api.post("/users/agency", data);
    return response.data;
  };

  return useMutation({
    mutationFn: createAgency,
    onSuccess: () => {
      message.success("대리점 회원가입이 완료되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["users-agency"],
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다.";
      message.error(errorMessage);
    }
  })
};

export default useCreateAgencyMutation;
