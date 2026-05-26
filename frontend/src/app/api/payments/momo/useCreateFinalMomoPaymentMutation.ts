import api from '@/lib/axios';
import { CreateMomoPayload, MomoPaymentResponse } from '@/types/momo';
import { useMutation } from '@tanstack/react-query';

const createFinalMomoPayment = async (
  payload: CreateMomoPayload,
): Promise<MomoPaymentResponse> => {
  const { data } = await api.post<MomoPaymentResponse>(
    "/momo/final/create",
    payload,
  );
  return data;
};

export const useCreateFinalMomoPaymentMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateMomoPayload) => createFinalMomoPayment(payload),
    onSuccess: (data) => {
      if (data.payUrl) {
        window.location.href = data.payUrl; // ✅ redirect sang MoMo
      }
    },
    onError: (error) => {
      console.error('MoMo payment error:', error);
    },
  });
};