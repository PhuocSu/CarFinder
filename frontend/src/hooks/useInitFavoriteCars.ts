"use client"

import { favoriteCarState } from "@/store/favoriteCar.atom";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useFavoriteQuery } from "@/app/api/favorite/useFavoriteQuery";
import { useAuth } from "./useAuth";

const useInitFavoriteCars = () => {
  const setFavoriteCars = useSetRecoilState(favoriteCarState);
  const { user } = useAuth();

  const { data, isSuccess } = useFavoriteQuery(user?.sub);

  // 1. Load from localStorage first (UI doesn't fluctuate)
  useEffect(() => {
    if (!user) return;

    const key = `favorite_car_ids_${user.sub}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      setFavoriteCars(JSON.parse(cached));
    }
  }, [user?.sub]);

  // 2. When API trả data -> sync Recoil + localStorage
  useEffect(() => {
    if (!user || !isSuccess || !data) return;

    const carIds = data.map((item: any) => item.carId);
    setFavoriteCars(carIds);

    localStorage.setItem(`favorite_car_ids_${user.sub}`, JSON.stringify(carIds));
  }, [data, isSuccess, user?.sub]);
};

export default useInitFavoriteCars;