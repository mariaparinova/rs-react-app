import styles from './page.module.css';
import { ReactNode } from 'react';

export default function DetailedPetLayout({ children }: { children: ReactNode }) {
  return <div className={styles.bgOverlay}>{children}</div>;
}
