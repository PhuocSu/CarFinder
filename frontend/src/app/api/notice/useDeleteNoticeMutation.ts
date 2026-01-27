import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { message } from "antd";
export function useDeleteNoticeMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/notice/${id}`);
    },
    onSuccess: () => {
      message.success("공지사항이 삭제되었습니다.");
      // ✅ Refresh list
      queryClient.invalidateQueries({
        queryKey: ["notice"],
      });
    },
    onError: () => {
      message.error("삭제에 실패했습니다.");
    },
  });
}