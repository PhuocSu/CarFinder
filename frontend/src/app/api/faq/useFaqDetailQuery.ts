import api from "@/lib/axios"
import { FaqCards } from "@/types/faq"
import { useQuery } from "@tanstack/react-query"


export function useFaqDetailQuery(id: string) {
  return useQuery<FaqCards>({
    queryKey: ["faq", id],
    queryFn: async () => {
      const response = await api.get(`/faq/write?id=${id}`)
      console.log("FAQ data Query:", response.data);
      return response.data
    },
    enabled: !!id,
  })
}