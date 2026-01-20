import { atom } from "recoil";

export interface VehicleFilter {
  search: string;
  page: number;
  pageSize: number;
  sortBy?: "price" | "year" | "mileage";
  order?: "asc" | "desc";
  
  badges: string[];

  modelIds?: number[];
  subModelIds?: number[];

  yearMin?: number;
  yearMax?: number;

  priceMin?: number;
  priceMax?: number;
  
  mileageMin?: number;
  mileageMax?: number;
  
  fuelTypes?: string[];
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
    modelIds: [],
    subModelIds: [],
    yearMin: undefined,
    yearMax: undefined,
    priceMin: undefined,
    priceMax: undefined,
    mileageMin: undefined,
    mileageMax: undefined,
    fuelTypes: [],
  },
});
