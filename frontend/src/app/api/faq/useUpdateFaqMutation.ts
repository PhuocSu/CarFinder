import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { FaqForm } from "@/types/faq";
import { useRouter } from "next/navigation";
import { message } from "antd";

async function updateFaq({ id, data }: { id: string; data: FaqForm }) {
  const response = await api.patch(`/faq/${id}`, data);
  return response.data;
}

export function useUpdateFaqMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  return useMutation({
    mutationFn: updateFaq,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["faq"] }); //cache "notice đã cũ"
      queryClient.setQueryData(["faq-detail", variables.id], data); //cập nhật cache notice-detail với id trong cache "notice"
      
      router.push(`/faq`);
      message.success("업데이트 성공!");
      console.log("Faq updated successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to update Faq:", error);
      message.error("업데이트 실패");
    },
  });
}
