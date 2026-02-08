import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";

export function useDeleteRecentSearchMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/recently-search-history/${id}?userId=${user?.sub}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recently-search-history"] });
    },
  });
}