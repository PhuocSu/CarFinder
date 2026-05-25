export interface UsePaymentsViewProps {
  carId: number;
  orderIds: string[];
}

export interface Payment {
  id: number;
  orderId: string;
  amount: number;
  transactionRef: string;
  statusPayment: string;
  paidAt: Date;
  contract: {
    id: number;
    car?: {
      id: number;
      carRegNo?: string;
      carImage?: string[];
      manufacturerYear?: number;
      mileage?: number;
      fuelType?: string;
      basePrice?: number;
      discountPercent?: number;
      subModel?: {
        subModelName?: string;
      };
      brandName?: string;
    };
    buyerName?: string;
    buyerPhone?: string;
    buyerEmail?: string;
    desiredDeliveryDate?: Date;
  };
}
