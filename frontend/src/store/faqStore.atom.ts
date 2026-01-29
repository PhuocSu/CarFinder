import { atom } from "recoil";
import { FaqResponse } from "@/types/faq";

export const faqState = atom<FaqResponse>({
  key: "FaqFilterState",
  default: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    search: "",
  },
});