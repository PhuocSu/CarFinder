"use client";

import api from "@/lib/axios";
import { CreateBusinessData } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const useCreateBusinessMutation = () => {
  const queryClient = useQueryClient();

  const createBusiness = async (data: CreateBusinessData) => {
    const response = await api.post("/users/business", data);
    return response.data;
  };

  return useMutation({
    mutationFn: createBusiness,
    onSuccess: () => {
      message.success("법인 회원가입이 완료되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["users-business"],
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다.";
      message.error(errorMessage);
    }
  })
};

export default useCreateBusinessMutation;
