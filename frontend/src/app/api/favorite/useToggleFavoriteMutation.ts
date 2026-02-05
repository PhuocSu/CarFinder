import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRecoilState } from "recoil";
import { favoriteCarState } from "@/store/favoriteCar.atom";
import { useAuth } from "@/hooks/useAuth";

export const useToggleFavoriteMutation = () => {
  const { user } = useAuth();
  const [favoriteCars, setFavoriteCars] = useRecoilState(favoriteCarState);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carId: number) => {
      const res = await api.post(`/favorite-cars/${carId}`);
      return res.data;
    },

    onMutate: async (carId: number) => {
      if (!user) return;

      const key = `favorite_car_ids_${user.sub}`;

      const prev = favoriteCars;

      const next = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];

      setFavoriteCars(next);
      localStorage.setItem(key, JSON.stringify(next));

      return { prev };
    },

    onError: (_err, _carId, context) => {
      if (!context || !user) return;

      setFavoriteCars(context.prev);
      localStorage.setItem(
        `favorite_car_ids_${user.sub}`,
        JSON.stringify(context.prev),
      );
    },

    onSuccess: (data, carId) => {
      // Update state => UI: change to red
      setFavoriteCars((prev) =>
        data.status === "added"
          ? [...prev, carId]
          : prev.filter((id) => id !== carId),
      );

      // Update query cache = useFavoriteQuery
      queryClient.invalidateQueries({
        queryKey: ["favorite-cars", user?.sub],
      });

      // Update query cache = useTopFavoriteQuery => mỗi lần toggle favorite thì top favorite cũng thay đổi
      queryClient.invalidateQueries({
        queryKey: ["top-favorite-cars"],
      });
    },
  });
};
