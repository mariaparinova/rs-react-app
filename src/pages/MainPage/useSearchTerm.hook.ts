import { useEffect, useState } from 'react';

export const SEARCH_TERM_KEY = 'searchTerm';
const initSearchTerm = localStorage.getItem(SEARCH_TERM_KEY) || '';

export function useSearchTerm() {
  const [searchTerm, setSearchTerm] = useState<string>(initSearchTerm);

  useEffect(() => {
    localStorage.setItem(SEARCH_TERM_KEY, searchTerm);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm };
}
