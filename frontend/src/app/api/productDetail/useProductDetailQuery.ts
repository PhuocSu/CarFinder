"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Vehicle } from "../listPage/useVehiclesQuery";

export function useVehicleDetailQuery(id: string | null) {
  return useQuery<Vehicle>({
    queryKey: ["vehicle-detail", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await api.get(`/car/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}