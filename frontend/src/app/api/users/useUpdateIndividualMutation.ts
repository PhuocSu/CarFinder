"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { message } from "antd";

interface UpdateIndividualData {
  custName?: string;
  hpNo?: string;
  email?: string;
  custPw?: string;
  custAddr?: string;
  birthDate?: string;
}

const useUpdateIndividualMutation = (id?: string) => {
  return useMutation({
    mutationFn: async (data: UpdateIndividualData) => {
      if (!id) throw new Error("User ID is required");
      
      const response = await api.patch(`/users/individual/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      message.success("정보가 성공적으로 업데이트되었습니다.");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "정보 업데이트에 실패했습니다.");
    },
  });
};

export default useUpdateIndividualMutation;