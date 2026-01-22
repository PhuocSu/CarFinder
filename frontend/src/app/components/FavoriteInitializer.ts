"use client";

import { useFavoriteQuery } from "@/app/api/favorite/useFavoriteQuery";
import { useAuth } from "@/hooks/useAuth";

export default function FavoriteInitializer() {
  const { user } = useAuth();
  useFavoriteQuery(user?.sub);
  return null;
}