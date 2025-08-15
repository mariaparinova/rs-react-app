import { useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '../app/theme-provider.tsx';

const THEME_KEY = 'petTheme';

const lightTheme = 'light-theme' as Theme;

const initTheme =
  typeof window !== 'undefined'
    ? (localStorage.getItem(THEME_KEY) as ThemeContextType['theme']) || lightTheme
    : lightTheme;

export function useTheme() {
  const [theme, setTheme] = useState<ThemeContextType['theme']>(initTheme);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
