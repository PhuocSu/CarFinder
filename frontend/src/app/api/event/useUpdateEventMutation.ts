import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { EventForm } from "@/types/event";
import { message } from "antd";
import { useRouter } from "next/navigation";

async function updateEvent({ id, data }: { id: string; data: EventForm }) {
  const response = await api.patch(`/event/${id}`, data);
  return response.data;
}

export function useUpdateEventMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["event"] }); //cache "event đã cũ"
      queryClient.setQueryData(["event-detail", variables.id], data); //cập nhật cache event-detail với id trong cache "event"
      
      console.log("Event updated successfully:", data);
      message.success("이벤트가 수정되었습니다.");
      router.push("/event");
    },
    onError: (error) => {
      console.error("Failed to update notice:", error);
      message.error("이벤트 수정에 실패했습니다.");
    },
  });
}
