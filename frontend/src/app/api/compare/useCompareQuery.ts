import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { compareCarState } from "@/store/compareCar.atom";

export function useCompareQuery(userId?: number) {
  const setCompareCars = useSetRecoilState(compareCarState);
  return useQuery({
    queryKey: ["compare-cars", userId],
    queryFn: async () => {
      const res = await api.get("/compare-cars");
      if (res.data) {
        setCompareCars(res.data.map((item: any) => item.carId));
      }
      return res.data;
    },
    enabled: !!userId,
  });
}