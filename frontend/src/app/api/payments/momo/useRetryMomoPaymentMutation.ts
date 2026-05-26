import api from "@/lib/axios";
import { MomoPaymentResponse, RetryMomoPaymentPayload } from "@/types/momo";
import { useMutation } from "@tanstack/react-query";

const retryMomoPayment = async (
  payload: RetryMomoPaymentPayload,
): Promise<MomoPaymentResponse> => {
  const { data } = await api.post<MomoPaymentResponse>("/momo/retry", payload);
  return data;
};

export const useRetryMomoPaymentMutation = () => {
  return useMutation({
    mutationFn: (payload: RetryMomoPaymentPayload) => retryMomoPayment(payload),
    onSuccess: (data) => {
      if (data.payUrl) {
        window.location.href = data.payUrl;
      }
    },
    onError: (error) => {
      console.error("MoMo retry payment error:", error);
    },
  });
};
