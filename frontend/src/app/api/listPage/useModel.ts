"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

/* ===== INTERFACE ===== */
export interface SubModel {
  id: number;
  subModelName: string;
}

export interface Model {
  id: number;
  modelName: string;
  subModels: SubModel[];
}

export function useModel() {
  return useQuery<Model[]>({
    queryKey: ["model"],
    queryFn: async () => {
      const res = await api.get("/model"); //GetALl
      return res.data;
    },
  });
}
