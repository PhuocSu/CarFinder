import { atom } from "recoil";

export const compareOpenState = atom<boolean>({
  key: "compareOpenState",
  default: false,
});
