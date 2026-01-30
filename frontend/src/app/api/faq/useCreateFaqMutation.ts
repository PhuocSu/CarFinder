"use client";

import api from "@/lib/axios";
import { FaqForm } from "@/types/faq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

const useCreateFaqMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createFaq = async (data: FaqForm) => {
    const response = await api.post("/faq", data);
    return response.data;
  };

  return useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      message.success("FAQ가 등록되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["faq"],
      });
      router.push("/faq");
    },
    onError: () => {
      message.error("등록에 실패했습니다.");
    }
  })
};

export default useCreateFaqMutation;
