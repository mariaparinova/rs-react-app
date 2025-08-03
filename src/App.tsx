import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { Theme, THEME_KEY, ThemeContext, ThemeContextValue } from './context/Theme.context.ts';
import { useCallback, useEffect, useState } from 'react';

const initTheme = (localStorage.getItem(THEME_KEY) as ThemeContextValue['theme']) || Theme.Light;

export function App() {
  const [theme, setTheme] = useState<ThemeContextValue['theme']>(initTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.Light ? Theme.Dark : Theme.Light));
  }, [setTheme]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <div className="app">
        <div className="layout">
          <Header />
          <main className="main" data-testid="main">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeContext>
  );
}
