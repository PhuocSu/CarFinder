"use client";

import { atom } from "recoil";

export type BuyMyCarFormData = {
  companyName?: string;
  representativeName?: string;
  businessRegistrationNumber?: string;
  homePhone?: string;
  email?: string;
  desiredDeliveryDate?: string;
};

export const buyMyCarFormState = atom<BuyMyCarFormData>({
  key: "buyMyCarFormState",
  default: {
    companyName: "",
    representativeName: "",
    businessRegistrationNumber: "",
    homePhone: "",
    email: "",
    desiredDeliveryDate: "",
  },
});
