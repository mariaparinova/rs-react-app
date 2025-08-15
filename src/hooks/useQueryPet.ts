import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPetById } from '../api-repositories/pets/pets.ts';

export function useQueryPet(id: string) {
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['petById', id],
    queryFn: () => {
      return getPetById({ id: id! });
    },
    staleTime: 5000 * 60 * 4,
    retry: false,
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['petById', id],
      refetchType: 'active',
    });
  };

  return { isPending, isError, data, error, invalidateQueries };
}
