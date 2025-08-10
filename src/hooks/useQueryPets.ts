import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPets } from '../api-repositories/pets/pets.ts';
import { formatSearchInput } from '../utils/formatSearchInput.ts';

interface UseQueryPetsParams {
  queryKey: unknown[];
  queryFnParams: {
    searchTerm: string;
    activePage: number;
    pageSize: number;
  };
}

export function useQueryPets({ queryKey, queryFnParams }: UseQueryPetsParams) {
  const queryClient = useQueryClient();
  const { searchTerm, activePage, pageSize } = queryFnParams;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['pets', ...queryKey],
    queryFn: () => getPets({ name: formatSearchInput(searchTerm), pageNumber: activePage, pageSize }),
    staleTime: 5000 * 60 * 4,
    retry: 1,
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['pets'],
      refetchType: 'active',
    });
  };

  return { isPending, isError, data, error, invalidateQueries };
}
