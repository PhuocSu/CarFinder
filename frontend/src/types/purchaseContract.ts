export interface CreateContractPayload {
  carId: number;
  buyerId: number;
  salepersonId?: number;
  priceAtPurchase: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  desiredDeliveryDate?: string;
  notes?: string;
}

export interface Contract {
  id: number;
  contractNumber: string;
  priceAtPurchase: number;
  statusContract: 'PENDING' | 'DRAFTED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  desiredDeliveryDate?: string;
  notes?: string;
  createdAt: string;
  car: { id: number; name: string };
  buyer: { id: number; name: string };
  saleperson?: { id: number; name: string };
  payments: any[];
}