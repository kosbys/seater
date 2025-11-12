import { useMutation, useQueryClient } from "@tanstack/react-query";

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
