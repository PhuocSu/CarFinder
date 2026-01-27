import { NoticeForm, NoticeResponse } from "@/types/notice";
import { atom } from "recoil";

export const noticeState = atom<NoticeResponse>({
  key: "NoticeFilterState",
  default: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    search: "",
  },
});

export const noticeFormState = atom<NoticeForm>({
  key: "noticeFormState",
  default: {
    title: "",
    fileAttachment: "",
    content: "",
    isTemporarySave: false,
  },
});
