"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useFetchIndividualQuery = (individualId?: string) => {
  const fetchIndividual = async () => {
    if (!individualId) return null;
    
    const response = await api.get(`/users/individual/${individualId}`);
    return response.data;
  };

  return useQuery({
    queryKey: ["individual", individualId],
    queryFn: fetchIndividual,
    enabled: !!individualId,
  });
};

export default useFetchIndividualQuery;
