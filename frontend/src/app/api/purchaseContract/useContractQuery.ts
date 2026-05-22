import api from "@/lib/axios";
import { Contract } from "@/types/purchaseContract";
import { useQuery } from "@tanstack/react-query";

export const useContractByIdQuery = (id: number) => {
  return useQuery<Contract>({ // ✅ báo cho TypeScript biết data trả về có type gì
    queryKey: ["purchase-contract", id],
    queryFn: async () => {
      const { data } = await api.get(`/purchase-contract/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
