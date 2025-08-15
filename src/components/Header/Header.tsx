'use client';

import styles from './Header.module.css';
import { Link, usePathname, useRouter } from 'i18n/navigation';
import { Theme, ThemeContext } from '../../app/theme-provider.tsx';
import { useContext } from 'react';
import IconLightTheme from '../../../public/icons/theme-light.svg';
import IconDarkTheme from '../../../public/icons/theme-dark.svg';
import { useTranslations } from 'next-intl';

export function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();

  const renderThemeSwitcher = () => {
    return (
      <div
        className={`${styles.optionsItem} ${styles.pointer}`}
        onClick={() => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)}
      >
        <span>{t('theme')}</span>
        {theme === Theme.Light ? <IconLightTheme /> : <IconDarkTheme />}
      </div>
    );
  };

  const renderLanguageSwitcher = () => {
    const changeLocale = (locale: string) => {
      router.push(pathname, { locale });
    };

    return (
      <div className={styles.optionsItem}>
        <div className={styles.pointer} onClick={() => changeLocale('en')}>
          en
        </div>
        |
        <div className={styles.pointer} onClick={() => changeLocale('ru')}>
          ru
        </div>
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <Link href="/">{t('headerItemPets')}</Link>
      <Link href="/about">{t('headerItemAbout')}</Link>
      <div className={styles.optionsContainer}>
        {renderThemeSwitcher()}
        {renderLanguageSwitcher()}
      </div>
    </header>
  );
}

export default Header;
