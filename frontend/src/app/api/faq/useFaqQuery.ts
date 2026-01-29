"use client"

import api from "@/lib/axios"
import { FaqResponse } from "@/types/faq";
import { useQuery } from "@tanstack/react-query"

async function fetchFaqCards(page = 1, limit = 10, search?: string): Promise<FaqResponse> {
  const response = await api.get("/faq", {
    params: { page, limit, search },
  });
  console.log("fetchFaqCards: ",response.data)
  return response.data;
}

export function useFaqQuery(page: number, limit = 10, search?: string) {
  return useQuery<FaqResponse>({
    queryKey: ["faq", page, limit, search],
    queryFn: () => fetchFaqCards(page, limit, search),
    placeholderData: (previousData) => previousData, // thay thế keepPreviousData
    staleTime: 60 * 60 * 1000,
  });
}

