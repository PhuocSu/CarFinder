import { vehicleFilterState } from "@/store/VehicleFilter.atom";
import { selector } from "recoil";

export const vehicleSearchSelector = selector<string>({
  key: "vehicleSearchSelector",
  get: ({ get }) => get(vehicleFilterState).search,
  set: ({ get, set }, newValue) => {
    const prev = get(vehicleFilterState);
    set(vehicleFilterState, {
      ...prev,
      search: newValue as string,
      page: 1, //automatically reset page when each searching
    });
  },
});

export const vehiclePageSelector = selector<number>({
  key: "vehiclePageSelector",
  get: ({ get }) => get(vehicleFilterState).page,
  set: ({ get, set }, newValue) => {
    const prev = get(vehicleFilterState);
    set(vehicleFilterState, {
      ...prev,
      page: newValue as number, //automatically reset page when switching page
    });
  },
});

export const vehicleFilterReadSelector = selector({
  key: "vehicleFilterReadSelector",
  get: ({ get }) => get(vehicleFilterState),
});

