import api from "@/lib/axios";

export const useConfirmMomoMutation = async (payload: {
  orderId: string;
  transId: string;
  responseTime: string;
  resultCode: string;
}) => {
  const { data } = await api.post("/momo/confirm", payload);
  return data;
};