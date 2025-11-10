import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useSectionsQuery = () => {
  useQuery({
    queryKey: ["sections"],
    queryFn: () => {},
  });
};

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
