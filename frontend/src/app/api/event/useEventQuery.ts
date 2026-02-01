"use client"

import api from "@/lib/axios"
import { EventResponse } from "@/types/event";
import { useQuery } from "@tanstack/react-query"

async function fetchEventCards(page = 1, limit = 8, search?: string): Promise<EventResponse> {
  const response = await api.get("/event", {
    params: { page, limit, search },
  });
  return response.data;
}

export function useEventQuery(page: number, limit = 8, search?: string) {
  return useQuery<EventResponse>({
    queryKey: ["event", page, limit, search],
    queryFn: () => fetchEventCards(page, limit, search),
    placeholderData: (previousData) => previousData, // thay thế keepPreviousData
    staleTime: 60 * 60 * 1000,
  });
}
