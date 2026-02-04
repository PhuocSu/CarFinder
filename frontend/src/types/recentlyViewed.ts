export interface RecentlyViewedItem {
  id: number;
  updatedAt: string;
  car: {
    carImage?: string[];
    basePrice: number;
    discountPercent: number;
    brandName: string;
    subModel: {
      subModelName: string;
      model: {
        modelName: string;
      };
    };
  };
}