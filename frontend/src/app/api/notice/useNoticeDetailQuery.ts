import api from "@/lib/axios"

import { NoticeCards } from "@/types/notice"

import { useQuery } from "@tanstack/react-query"



export function useNoticeDetailQuery(id: string) {

  return useQuery<NoticeCards>({

    queryKey: ["notice", id],

    queryFn: async () => {

      const response = await api.get(`/notice/write?id=${id}`)

      return response.data

    },

    enabled: !!id,

  })

}