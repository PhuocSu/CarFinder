export interface CreateMomoPayload {
  contractId: number;
  amount: number;
}

export interface RetryMomoPaymentPayload {
  orderId: string;
}

export interface MomoPaymentResponse {
  payUrl: string;
  deeplink?: string;
  qrCodeUrl?: string;
  resultCode: number;
  message: string;
}
