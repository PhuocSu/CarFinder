import api from "@/lib/axios"
import { EventCards } from "@/types/event"
import { useQuery } from "@tanstack/react-query"

export function useEventDetailQuery(id: string) {
  return useQuery<EventCards>({
    queryKey: ["event", id],
    queryFn: async () => {
      const response = await api.get(`/event/write?id=${id}`)
      console.log("useEventDetailQuery: ", response.data)
      return response.data
    },
    enabled: !!id,
  })
}
