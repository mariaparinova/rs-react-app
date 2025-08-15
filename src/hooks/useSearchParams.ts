import { useSearchParams as useSearchParamsNextJs } from 'next/navigation';
import { useRouter, usePathname } from 'i18n/navigation';

export function useSearchParams() {
  const urlSearchParams = useSearchParamsNextJs();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (searchParams: URLSearchParams) => {
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return [urlSearchParams, setSearchParams] as const;
}
