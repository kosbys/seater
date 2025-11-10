import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useShiftsQuery = () => {
  useQuery({
    queryKey: ["sections"],
    queryFn: () => {},
  });
};

const useCreateShiftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["sections"]),
  });
};

const useDeleteShiftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["sections"]),
  });
};
