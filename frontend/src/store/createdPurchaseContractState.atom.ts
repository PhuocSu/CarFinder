import { atom } from "recoil";
import { Contract } from "@/types/purchaseContract";

export const createdPurchaseContractState = atom<Contract | null>({
  key: "createdPurchaseContractState",
  default: null,
});
