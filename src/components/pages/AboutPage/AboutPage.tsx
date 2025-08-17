import styles from './AboutPage.module.css';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <div className={styles.aboutPage}>
      <div className={styles.authorInfo}>
        <h3>{t('mariaParinova')}</h3>
        <p className={styles.description}>{t('aboutAuthor')}</p>
      </div>
      <div>
        <p className={styles.description}>{t('p1')}</p>
        <p className={styles.description}>
          <a href="https://rs.school/courses/reactjs" target="_blank" rel="noopener noreferrer">
            {t('p2')}
          </a>
        </p>
        <p className={styles.description}>{t('p3')}</p>
      </div>
    </div>
  );
}
