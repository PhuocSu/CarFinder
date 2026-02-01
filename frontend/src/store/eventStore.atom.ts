import { EventForm, EventResponse } from "@/types/event";
import { atom } from "recoil";

export const eventState = atom<EventResponse>({
  key: "EventFilterState",
  default: {
    items: [],
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 0,
    search: "",
  },
});

export const eventFormState = atom<EventForm>({
  key: "eventFormState",
  default: {
    title: "",
    subTitle: "",
    fileAttachment: "",
    content: "",
    startDate: "",
    endDate: "",
    isTemporarySave: false,
  },
});
