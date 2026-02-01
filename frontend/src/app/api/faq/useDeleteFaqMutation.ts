import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { message } from "antd";
export function useDeleteFaqMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/faq/${id}`);
    },
    onSuccess: () => {
      message.success("FAQ가 삭제되었습니다.");
      // ✅ Refresh list
      queryClient.invalidateQueries({
        queryKey: ["faq"],
      });
    },
    onError: () => {
      message.error("삭제에 실패했습니다.");
    },
  });
}