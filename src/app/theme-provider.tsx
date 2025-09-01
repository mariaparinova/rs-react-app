'use client';
import { createContext, ReactNode, SetStateAction, Dispatch } from 'react';
import { useTheme } from '../hooks/useTheme.ts';

export enum Theme {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Light,
  setTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useTheme();

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext>
  );
}
