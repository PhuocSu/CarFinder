import axiosInstance from "@/lib/axios";
import { CreateMomoPayload, MomoPaymentResponse } from "@/types/momo";

export const createMomoPayment = async (
  payload: CreateMomoPayload,
): Promise<MomoPaymentResponse> => {
  const { data } = await axiosInstance.post<MomoPaymentResponse>(
    "/momo/create",
    payload,
  );
  return data;
};
