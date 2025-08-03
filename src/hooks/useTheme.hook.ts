import { useEffect, useState } from 'react';
import { Theme, ThemeContextValue } from '../context/Theme.context.ts';

const THEME_KEY = 'petTheme';
const initTheme = (localStorage.getItem(THEME_KEY) as ThemeContextValue['theme']) || Theme.Light;

export function useTheme() {
  const [theme, setTheme] = useState<ThemeContextValue['theme']>(initTheme);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.className = theme;
  }, [theme]);

  return [theme, setTheme] as const;
}
