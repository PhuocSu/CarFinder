export interface CreateMomoPayload {
  contractId: number;
  amount: number;
}

export interface MomoPaymentResponse {
  payUrl: string;
  deeplink?: string;
  qrCodeUrl?: string;
  resultCode: number;
  message: string;
}