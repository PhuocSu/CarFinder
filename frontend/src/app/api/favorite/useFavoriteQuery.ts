import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useSetRecoilState } from "recoil";
import { favoriteCarState } from "@/store/favoriteCar.atom";

export function useFavoriteQuery(userId?: number) {
  const setFavoriteCars = useSetRecoilState(favoriteCarState);
  return useQuery({
    queryKey: ["favorite-cars", userId],
    queryFn: async () => {
      const res = await api.get("/favorite-cars");
      // Update Recoil State => Red Heart víible even refresh
      if (res.data) {
        setFavoriteCars(res.data.map((item: any) => item.carId));
      }
      return res.data;
    },
    enabled: !!userId, // chỉ gọi khi đã login
  });
}
