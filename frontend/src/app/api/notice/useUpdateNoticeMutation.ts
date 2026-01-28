import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { NoticeForm } from "@/types/notice";

async function updateNotice({ id, data }: { id: string; data: NoticeForm }) {
  const response = await api.patch(`/notice/${id}`, data);
  return response.data;
}

export function useUpdateNoticeMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateNotice,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notice"] }); //cache "notice đã cũ"
      queryClient.setQueryData(["notice-detail", variables.id], data); //cập nhật cache notice-detail với id trong cache "notice"
      
      console.log("Notice updated successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to update notice:", error);
    },
  });
}
