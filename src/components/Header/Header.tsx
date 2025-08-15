'use client';

import styles from './Header.module.css';
import Link from 'next/link';
import { Theme, ThemeContext } from '../../app/theme-provider.tsx';
import { useContext } from 'react';
import IconLightTheme from '../../../public/icons/theme-light.svg';
import IconDarkTheme from '../../../public/icons/theme-dark.svg';

export function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <Link href="/">PETS</Link>
      <Link href="/about">ABOUT</Link>
      <div className={styles.themeContainer} onClick={() => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)}>
        <span>Theme</span>
        {theme === Theme.Light ? <IconLightTheme /> : <IconDarkTheme />}
      </div>
    </header>
  );
}

export default Header;
