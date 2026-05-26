import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Payment } from "@/types/paymentView";

type UsePaymentsViewProps = {
  contractId: number;
};

export const usePaymentsView = ({ contractId }: UsePaymentsViewProps) => {
  return useQuery({
    queryKey: ["payments", contractId],
    queryFn: async () => {
      const { data } = await api.get(`/payments/view?contractId=${contractId}`);
      return data.payments as Payment[];
    },
    enabled: !!contractId,
  });
};
