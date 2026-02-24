"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useFetchAgencyQuery = (agencyId?: string) => {
  const fetchAgency = async () => {
    if (!agencyId) return null;
    
    const response = await api.get(`/users/agency/${agencyId}`);
    return response.data;
  };

  return useQuery({
    queryKey: ["agency", agencyId],
    queryFn: fetchAgency,
    enabled: !!agencyId,
  });
};

export default useFetchAgencyQuery;
