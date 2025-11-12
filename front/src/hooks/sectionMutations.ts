import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateSectionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["sections"]),
  });
};

const useDeleteSectionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries(["sections"]),
  });
};

export { useCreateSectionMutation, useDeleteSectionMutation };
