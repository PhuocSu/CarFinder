"use client";

import api from "@/lib/axios";
import { CreateIndividualData } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const useCreateIndividualMutation = () => {
  const queryClient = useQueryClient();

  const createIndividual = async (data: CreateIndividualData) => {
    const response = await api.post("/users/individual", data);
    return response.data;
  };

  return useMutation({
    mutationFn: createIndividual,
    onSuccess: () => {
      message.success("개인 회원가입이 완료되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["users-individual"],
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다.";
      message.error(errorMessage);
    }
  })
};

export default useCreateIndividualMutation;
