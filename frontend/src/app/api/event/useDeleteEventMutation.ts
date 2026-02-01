import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { message } from "antd";
export function useDeleteEventMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/event/${id}`);
    },
    onSuccess: () => {
      message.success("이벤트가 삭제되었습니다.");
      // ✅ Refresh list
      queryClient.invalidateQueries({
        queryKey: ["event"],
      });
    },
    onError: () => {
      message.error("삭제에 실패했습니다.");
    },
  });
}