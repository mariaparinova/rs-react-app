import { useSuspenseQuery } from '@tanstack/react-query';
import { getEmissionsByCountries } from '../co2-api/api.ts';

const ONE_HOUR = 1000 * 60 * 60;

export function useQueryData() {
  const { isPending, isError, data, error } = useSuspenseQuery({
    queryKey: ['fullData'],
    queryFn: () => {
      return getEmissionsByCountries();
    },
    staleTime: ONE_HOUR,
    retry: false,
  });

  return { isPending, isError, data, error };
}
