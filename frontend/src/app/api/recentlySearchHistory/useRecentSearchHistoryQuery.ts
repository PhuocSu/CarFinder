import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
async function fetchRecentSearchHistory(userId?: number) {
  if (!userId) return [];
  const response = await api.get(`/recently-search-history?userId=${userId}`);
  return response.data;
}

export function useRecentSearchHistoryQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["recently-search-history"],
    queryFn: () => fetchRecentSearchHistory(user?.sub),
    enabled: !!user, 
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
