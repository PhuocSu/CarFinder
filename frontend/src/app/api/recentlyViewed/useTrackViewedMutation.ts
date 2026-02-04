import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTrackViewedMutation = () => {
    const {user} = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (carId: number) => {
            const res = await api.post(`/recently-viewed-car/${carId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recently-viewed-car", user?.sub],
            });
        },
    })
}