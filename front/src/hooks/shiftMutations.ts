import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateShiftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn:
    onSuccess: () => queryClient.invalidateQueries(["shifts"]),
  });
};

const useDeleteShiftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["shifts"]),
  });
};

export { useCreateShiftMutation, useDeleteShiftMutation };
