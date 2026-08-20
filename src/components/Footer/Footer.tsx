import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          👑 <strong>KingBox</strong> — Fast, private local media downloader & converter.
        </p>
        <p className={styles.subText}>
          Personal use only. Respect copyright and content owner rights.
        </p>
      </div>
    </footer>
  );
};
