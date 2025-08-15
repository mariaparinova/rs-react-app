import { usePathname, useRouter, useSearchParams as useSearchParamsNextJs } from 'next/navigation';

export function useSearchParams() {
  const urlSearchParams = useSearchParamsNextJs();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (searchParams: URLSearchParams) => {
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return [urlSearchParams, setSearchParams] as const;
}
