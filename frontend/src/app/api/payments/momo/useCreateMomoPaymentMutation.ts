import api from '@/lib/axios';
import { CreateMomoPayload, MomoPaymentResponse } from '@/types/momo';
import { useMutation } from '@tanstack/react-query';

const createMomoPayment = async (
  payload: CreateMomoPayload,
): Promise<MomoPaymentResponse> => {
  const { data } = await api.post<MomoPaymentResponse>(
    "/momo/create",
    payload,
  );
  return data;
};

export const useCreateMomoPaymentMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateMomoPayload) => createMomoPayment(payload),
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