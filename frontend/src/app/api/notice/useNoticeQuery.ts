"use client"

import api from "@/lib/axios"
import { NoticeResponse } from "@/types/notice";
import { useQuery } from "@tanstack/react-query"

async function fetchNoticeCards(page = 1, limit = 10, search?: string): Promise<NoticeResponse> {
  const response = await api.get("/notice", {
    params: { page, limit, search },
  });
  // console.log("fetchNoticeCards: ",response.data)
  return response.data;
}

export function useNoticeQuery(page: number, limit = 10, search?: string) {
  return useQuery<NoticeResponse>({
    queryKey: ["notice", page, limit, search],
    queryFn: () => fetchNoticeCards(page, limit, search),
    placeholderData: (previousData) => previousData, // thay thế keepPreviousData
    staleTime: 60 * 60 * 1000,
  });
}
