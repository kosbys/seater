import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useStationsQuery = () => {
  useQuery({
    queryKey: ["sections"],
    queryFn: () => {},
  });
};

const useCreateStationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["sections"]),
  });
};

const useDeleteStationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["sections"]),
  });
};
