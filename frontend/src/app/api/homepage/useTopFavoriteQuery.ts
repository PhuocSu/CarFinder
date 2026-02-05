import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

async function fetchTopFavoriteCars(limit: number = 3) { 
  const response = await api.get(`/car/top?limit=${limit}`);
  return response.data;
}

export function useTopFavoriteQuery(limit: number = 3) {
  return useQuery({
    queryKey: ["top-favorite-cars"],
    queryFn: () => fetchTopFavoriteCars(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}