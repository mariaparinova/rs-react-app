import { createContext } from 'react';

export const THEME_KEY = 'petTheme';

export enum Theme {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (() => void) | undefined;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: Theme.Light,
  toggleTheme: undefined,
});
