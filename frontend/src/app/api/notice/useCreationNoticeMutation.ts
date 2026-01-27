import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { NoticeForm } from "@/types/notice";

export function useCreateNoticeMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: NoticeForm) => {
      const response = await api.post("/notice", data);
      return response.data;
    },
    onSuccess: () => {
      message.success("공지사항이 등록되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["notice"], // Khớp với queryKey trong useNoticeQuery
      });
      router.push("/notice");
    },
    onError: () => {
      message.error("등록에 실패했습니다.");
    },
  })
}