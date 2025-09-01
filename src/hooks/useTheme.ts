import { useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '../app/theme-provider.tsx';

const THEME_KEY = 'petTheme';
const lightTheme = 'light-theme' as Theme;

export function useTheme() {
  const [theme, setTheme] = useState<ThemeContextType['theme']>(lightTheme);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored) {
        setTheme(stored);
      }
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      console.warn('theme was not set to LS');
    }
  }, [hydrated, theme]);

  return [theme, setTheme] as const;
}
