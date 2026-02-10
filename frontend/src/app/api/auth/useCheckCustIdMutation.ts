// useCheckCustIdMutation.ts
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useCheckCustIdMutation = () => {
  return useMutation({
    mutationFn: async (custId: string) => {
      console.log("Mutation checking custId:", custId);
      const res = await api.post(`/users/check-custId?custId=${custId}`);
      console.log("Mutation response:", res.data);
      return res.data;
    },
  });
};