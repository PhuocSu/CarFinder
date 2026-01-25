import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRecoilState } from "recoil";
import { useAuth } from "@/hooks/useAuth";
import { compareCarState } from "@/store/compareCar.atom";

export const useToggleCompareMutation = () => {
  const { user } = useAuth();
  const [compareCars, setCompareCars] = useRecoilState(compareCarState);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carId: number) => {
      const res = await api.post(`/compare-cars/${carId}`);
      return res.data;
    },

    //Update UI immediately
    onMutate: async (carId: number) => {
      if (!user) return;

      const key = `compare_car_ids_${user.sub}`;

      const prev = compareCars;

      const next = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];

      setCompareCars(next);
      localStorage.setItem(key, JSON.stringify(next));

      return { prev };
    },

    onError: (_err, _carId, context) => {
      if (!context || !user) return;

      setCompareCars(context.prev);
      localStorage.setItem(
        `compare_car_ids_${user.sub}`,
        JSON.stringify(context.prev),
      );
    },

    onSuccess: (data, carId) => {
      // Update state => UI: change to red
      setCompareCars((prev) =>
        data.status === "added"
          ? [...prev, carId]
          : prev.filter((id) => id !== carId),
      );

      // Update query cache = useFavoriteQuery
      queryClient.invalidateQueries({
        queryKey: ["compare-cars", user?.sub],
      });
    },
  });
};
