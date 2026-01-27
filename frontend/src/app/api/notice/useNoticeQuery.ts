"use client"

import api from "@/lib/axios"
import { NoticeResponse } from "@/types/notice";
import { useQuery } from "@tanstack/react-query"

async function fetchNoticeCards(page = 1, limit = 10): Promise<NoticeResponse> {
  const response = await api.get("/notice", {
    params: { page, limit },
  });
  return response.data;
}

export function useNoticeQuery(page: number, limit = 10) {
  return useQuery<NoticeResponse>({
    queryKey: ["notice", page, limit],
    queryFn: () => fetchNoticeCards(page, limit),
    placeholderData: (previousData) => previousData, // thay thế keepPreviousData
    staleTime: 60 * 60 * 1000,
  });
}
