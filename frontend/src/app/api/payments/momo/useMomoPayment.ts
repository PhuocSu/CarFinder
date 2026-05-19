import { createMomoPayment } from '@/services/momo.service';
import { CreateMomoPayload } from '@/types/momo';
import { useMutation } from '@tanstack/react-query';

export const useMomoPayment = () => {
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