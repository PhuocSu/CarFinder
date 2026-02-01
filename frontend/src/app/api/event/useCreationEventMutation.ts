import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { EventForm } from "@/types/event";

export function useCreateEventMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: EventForm) => {
      const response = await api.post("/event", data);
      return response.data;
    },
    onSuccess: () => {
      message.success("이벤트가 등록되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["event"], // Khớp với queryKey trong useNoticeQuery
      });
      router.push("/event");
    },
    onError: () => {
      message.error("등록에 실패했습니다.");
    },
  })
}