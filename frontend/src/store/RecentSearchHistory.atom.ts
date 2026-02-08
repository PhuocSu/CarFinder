import { atom } from "recoil";
import type { VehicleFilter } from "./VehicleFilter.atom";

export type RecentSearchItem = VehicleFilter;

export const recentSearchHistoryState = atom<RecentSearchItem[]>({
  key: "recentSearchHistoryState",
  default: [],
});
