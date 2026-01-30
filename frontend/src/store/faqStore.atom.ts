import { atom } from "recoil";
import { FaqForm, FaqResponse } from "@/types/faq";
import { Category } from "@/enums/category.enum";

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

export const faqFormState = atom<FaqForm>({
  key: "faqFormState",
  default: {
    title: "",
    category: Category.VEHICLE_AND_CONTRACT_PROCEDURE,
    fileAttachment: "",
    content: "",
    isTemporarySave: false,
  },
});