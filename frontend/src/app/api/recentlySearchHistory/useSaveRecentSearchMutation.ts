import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";

export function useSaveRecentSearchMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (filters: any) => {
      const res = await api.post("/recently-search-history", {
        userId: user?.sub,
        filters: filters   
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recently-search-history"] });
    },
  });
}