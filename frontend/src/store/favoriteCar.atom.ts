import { atom } from "recoil";

export const favoriteCarState = atom<number[]>({ //purpose: store favorite car ids
  key: "favoriteCarState",
  default: [],
});