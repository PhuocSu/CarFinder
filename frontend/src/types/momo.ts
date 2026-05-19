export interface CreateMomoPayload {
  orderId: string;
  amount: number;
}

export interface MomoPaymentResponse {
  payUrl: string;
  deeplink?: string;
  qrCodeUrl?: string;
  resultCode: number;
  message: string;
}