import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStations } from "@/api/station";

const useCreateStationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["stations"]),
  });
};

const useDeleteStationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["stations"]),
  });
};

export { useCreateStationMutation, useDeleteStationMutation };
