"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useFetchBusinessQuery = (businessId?: string) => {
  const fetchBusiness = async () => {
    if (!businessId) return null;
    
    const response = await api.get(`/users/business/${businessId}`);
    console.log("Fetch Business Data:", response.data);
    return response.data;
  };

  return useQuery({
    queryKey: ["business", businessId],
    queryFn: fetchBusiness,
    enabled: !!businessId,
  });
};

export default useFetchBusinessQuery;