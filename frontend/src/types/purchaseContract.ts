export interface CreateContractPayload {
  carId: number;
  buyerId: number;
  salepersonId?: number;
  priceAtPurchase: number;
  buyerEmail: string;
  buyerPhone: string;
  desiredDeliveryDate?: string;
  notes?: string;
}

export interface Contract {
  id: number;
  contractNumber: string;
  priceAtPurchase: number;
  statusContract: "DRAFTED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  buyerRegNo: string;
  buyerEmail: string;
  buyerPhone: string;
  desiredDeliveryDate?: string;
  notes?: string;
  createdAt: string;
  car: {
    id: number;
    carImage: string[];
    brandName: string;
    vehicleBadge: string[];
    firstRegDate: string;
    fuelType: string;
    exteriorColor: string;
    seatingCapacity: number;
    manufacturerYear: number;
    mileage: number;
    engineDisplacement: string;
    interiorColor: string;
    carRegNo: string;
    transmissionType: string;
    basePrice: number;
    discountPercent: number;
    description: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    subModel?: {
      id: number;
      subModelName: string;
      model?: {
        id: number;
        modelName: string;
      };
    };
  };
  buyer: {
    id: number;
    custName: string;
    reprsntRegNo: string;
    homePhone: number;
    email: string;
  };
  saleperson?: { id: number; name: string };
  payments: any[];
}
