"use client";

import { atom } from "recoil";

export type BuyMyCarFormData = {
  homePhone?: string;
  email?: string;
  desiredDeliveryDate?: string;
};

export const buyMyCarFormState = atom<BuyMyCarFormData>({
  key: "buyMyCarFormState",
  default: {
    homePhone: "",
    email: "",
    desiredDeliveryDate: "",
  },
});
