import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { Theme, ThemeContext } from './context/Theme.context.ts';
import { useCallback } from 'react';
import { useTheme } from './hooks/useTheme.hook.ts';

export function App() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.Light ? Theme.Dark : Theme.Light));
  }, [setTheme]);

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
