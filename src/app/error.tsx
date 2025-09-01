'use client';

import styles from './error.module.css';

export default function Error() {
  return (
    <div className={styles.error}>
      <h3>Error</h3>
      <div>Oops! Something went wrong</div>
    </div>
  );
}
