import api from "@/lib/axios";
import { Contract } from "@/types/purchaseContract";
import { useQuery } from "@tanstack/react-query";

export const useBuyerContractQuery = (buyerId: number | null | undefined) => {
  return useQuery<Contract[]>({
    queryKey: ["purchase-contract", "buyer", buyerId],
    queryFn: async () => {
      const { data } = await api.get(`/purchase-contract/buyer/${buyerId}`);
      console.log("Xe mới:", data)
      return data;
    },
    enabled: !!buyerId,
  });
};
