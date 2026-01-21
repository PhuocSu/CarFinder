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
  get: ({ get }) => {
    const filter = get(vehicleFilterState);
    return {
      search: filter.search || undefined,
      page: filter.page,
      pageSize: filter.pageSize,
      sortBy: filter.sortBy,
      order: filter.sortBy ? filter.order : undefined,

      modelIds: filter.modelIds?.length ? filter.modelIds : undefined,
      subModelIds: filter.subModelIds?.length ? filter.subModelIds : undefined,
      
      badges: filter.badges,
      yearMin: filter.yearMin,
      yearMax: filter.yearMax,
      priceMin: filter.priceMin,
      priceMax: filter.priceMax,
      mileageMin: filter.mileageMin,
      mileageMax: filter.mileageMax,
      fuelTypes: filter.fuelTypes?.length ? filter.fuelTypes : undefined,
      exColors: filter.exColors?.length ? filter.exColors : undefined,
      inColors: filter.inColors?.length ? filter.inColors : undefined,
    };
  },
});

