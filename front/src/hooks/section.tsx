import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSections } from "@/api/section";

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
