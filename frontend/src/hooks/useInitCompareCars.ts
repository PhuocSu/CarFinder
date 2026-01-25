"use client"
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useCompareQuery } from "@/app/api/compare/useCompareQuery";
import { compareCarState } from "@/store/compareCar.atom";

const useInitCompareCars = () => {
  const setCompareCars = useSetRecoilState(compareCarState);
  const { user } = useAuth();

  const { data, isSuccess } = useCompareQuery(user?.sub);

  // 1. Load from localStorage first (UI doesn't fluctuate)
  useEffect(() => {
    console.log("useInitCompareCars - user:", user);
    if (!user) return;

    const key = `compare_car_ids_${user.sub}`;
    console.log("useInitCompareCars - key:", key);
    const cached = localStorage.getItem(key);
    console.log("useInitCompareCars - cached:", cached);
    if (cached) {
      setCompareCars(JSON.parse(cached));
      console.log("useInitCompareCars - loaded:", JSON.parse(cached));
    }
  }, [user?.sub]);

  // 2. When API trả data -> sync Recoil + localStorage
  useEffect(() => {
    if (!user || !isSuccess || !data) return;

    const carIds = data.map((item: any) => item.carId);
    setCompareCars(carIds);

    localStorage.setItem(`compare_car_ids_${user.sub}`, JSON.stringify(carIds));
  }, [data, isSuccess, user?.sub]);
};

export default useInitCompareCars;