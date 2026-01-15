"use client"

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRecoilValue } from "recoil";
import { vehicleFilterReadSelector } from "@/selectors/VehicleFilter.selectors";


export interface Vehicle {
    id: number;
    carImage: string[];        
    vehicleBadge: string[];    
    firstRegDate: string;      
    fuelType: string;          
    exteriorColor: string;
    seatingCapacity: number;
    manufacturerYear: number;
    mileage: number;
    engineDisplacement: number;
    interiorColor: string;
    carRegno: string;
    transmissionType: string;
    basePrice: number;         
    discountPercent: number;  
    description: string; 
    isAvailable: boolean;    
    // For finalefinale  
    finalPrice?: number;
    //For name: sub_model_model_name
    modelName: string;
    subModelName: string;
    brandName: string;

    createdAt: string;     
}


export function useVehicles() {
    const filter = useRecoilValue(vehicleFilterReadSelector);

  return useQuery<{
    data: Vehicle[];
    total: number;
  }>({
    queryKey: [
      "vehicles",
      filter.search,
      filter.page,
      filter.pageSize,
      filter.orderBy,
      filter.orderDirection,
    ],
    queryFn: async () => {
      const res = await api.get("/car", {
        params: filter,
      });
      console.log("API RESPONSE:", res.data);
      return res.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
  });
}

