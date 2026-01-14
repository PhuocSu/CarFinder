"use client"

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

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
    return useQuery<Vehicle[]>({
        queryKey: ["vehicles"],
        queryFn: async () => {
            const res = await api.get("/car");
            
            return res.data;
        },
        
    });
}

