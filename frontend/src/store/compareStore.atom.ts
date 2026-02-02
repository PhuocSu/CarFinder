import { atom } from "recoil";

export const compareOpenState = atom<boolean>({
  key: "compareOpenState",
  default: false,
});

export interface CarCompare {
  id: number;
  carRegNo: string;
  brandName: string;
  subModelName: string;
  modelName: string;
  basePrice: number;
  discountPercent: number;
  manufacturerYear: number;
  fuelType: string;
  engineDisplacement: string;
  mileage: number;
  exteriorColor: string;
  interiorColor: string;
  carImage: string[];
}

export const compareCarsState = atom<CarCompare>({
  key: "compareCarsState",
  default: {
    id: 0,
    carRegNo: "",
    brandName: "",
    subModelName: "",
    modelName: "",
    basePrice: 0,
    discountPercent: 0,
    manufacturerYear: 0,
    fuelType: "",
    engineDisplacement: "",
    mileage: 0,
    exteriorColor: "",
    interiorColor: "",
    carImage: [],
  },
});
