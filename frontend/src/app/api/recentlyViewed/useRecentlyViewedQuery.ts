import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useRecentlyViewedQuery(userId?: number) {
  return useQuery({
    queryKey: ["recently-viewed-car", userId],
    queryFn: async () => {
      const res = await api.get("/recently-viewed-car");
      return res.data;
    },
    enabled: !!userId, // chỉ gọi khi đã login
  });
}
