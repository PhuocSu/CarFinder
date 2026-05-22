import api from "@/lib/axios";
import { CreateContractPayload } from "@/types/purchaseContract";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateContractMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateContractPayload) => {
      const { data } = await api.post("/purchase-contract", payload);
      return data;
    },
    onSuccess: () => {
      // ✅ tự động refetch danh sách sau khi tạo thành công
      queryClient.invalidateQueries({ queryKey: ["purchase-contract"] });
    },
  });
};
