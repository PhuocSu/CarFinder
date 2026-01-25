"use client";

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
  carRegNo: string;
  transmissionType: string;
  basePrice: number;
  discountPercent: number;
  description: string;
  isAvailable: boolean;
  createdAt: string;

  brandName: string;

  subModel: {
    id: number;
    subModelName: string;
    model: {
      id: number;
      modelName: string;
    };
  };
}

export function useVehiclesQuery() {
  const filter = useRecoilValue(vehicleFilterReadSelector);
  // console.log("VEHICLE FILTER:", filter);

  return useQuery<{
    data: Vehicle[];
    total: number;
  }>({
    queryKey: ["vehicles", filter],
    queryFn: async () => {
      const res = await api.get("/car", {
        params: {
          ...filter,
          badges: filter.badges?.length ? filter.badges.join(',') : undefined,
          modelIds: filter.modelIds?.length ? filter.modelIds.join(',') : undefined,
          subModelIds: filter.subModelIds?.length ? filter.subModelIds.join(',') : undefined,
          fuelTypes: filter.fuelTypes?.length ? filter.fuelTypes.join(',') : undefined,
          exColors: filter.exColors?.length ? filter.exColors.join(',') : undefined,
          inColors: filter.inColors?.length ? filter.inColors.join(',') : undefined,
        }
      })
      return res.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
  });
}
