import { atom } from "recoil";

export const compareCarState = atom<number[]>({ //purpose: store compare car ids
  key: "compareCarState",
  default: [],
});