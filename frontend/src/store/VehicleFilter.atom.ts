import { atom } from "recoil";

export interface VehicleFilter {
  search: string;
  page: number;
  pageSize: number;
  sortBy?: "price" | "year" | "mileage";
  order?: "asc" | "desc";
  
  badges: string[];

  modelId?: number;
  subModelId?: number;
}

export type SortBy = "price" | "year" | "mileage" | undefined;
export type Order = "asc" | "desc";


export const vehicleFilterState = atom<VehicleFilter>({
  key: "vehicleFilterState",
  default: {
    search: "",
    page: 1,
    pageSize: 12,
    sortBy: undefined as SortBy,
    order: "asc" as Order,

    badges: [],
  },
});
