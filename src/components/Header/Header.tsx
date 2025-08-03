import './Header.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import { Theme, ThemeContext } from '../../context/Theme.context.ts';
import { useContext } from 'react';
import IconThemeLight from '../../icons/theme-light.svg?react';
import IconThemeDark from '../../icons/theme-dark.svg?react';

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header" data-testid="header">
      <Link to={ROUTES.ROOT}>PETS</Link>
      <Link to={ROUTES.ABOUT}>ABOUT</Link>
      <div className="theme-container" onClick={toggleTheme}>
        <span>Theme</span>
        {theme === Theme.Light ? <IconThemeLight /> : <IconThemeDark />}
      </div>
    </header>
  );
}
