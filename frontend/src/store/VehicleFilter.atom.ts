import { atom } from "recoil";

export interface VehicleFilter {
  search: string;
  page: number;
  pageSize: number;
  orderBy: "createdAt";
  orderDirection: "ASC" | "DESC";
}

export const vehicleFilterState = atom<VehicleFilter>({
  key: "vehicleFilterState",
  default: {
    search: "",
    page: 1,
    pageSize: 12,
    orderBy: "createdAt",
    orderDirection: "DESC",
  },
});
