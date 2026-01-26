import { useRecoilState, useResetRecoilState } from "recoil";
import { vehicleFilterState, VehicleFilter } from "@/store/VehicleFilter.atom";

export const useVehicleFilter = () => {
  const [filter, setFilter] = useRecoilState(vehicleFilterState);
  const resetFilter = useResetRecoilState(vehicleFilterState);

  // Update individual filter
  const updateFilter = (updates: Partial<VehicleFilter>) => {
    setFilter((prev) => ({ ...prev, ...updates, page: 1 }));
  };

  // Reset toàn bộ về default
  const resetAllFilters = () => {
    resetFilter();
  };

  return {
    filter,
    updateFilter,
    resetAllFilters,
  };
};
