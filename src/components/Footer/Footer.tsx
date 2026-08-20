import React, { useState } from 'react';
import styles from './Footer.module.css';
import { AboutModal } from '../AboutModal/AboutModal';

export const Footer: React.FC = () => {
  const [showAbout, setShowAbout] = useState<boolean>(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <button type="button" className={styles.linkBtn} onClick={() => setShowAbout(true)}>
            About Us
          </button>
          <button type="button" className={styles.linkBtn} onClick={() => setShowAbout(true)}>
            Contact Us
          </button>
        </div>

        <p className={styles.copy}>
          👑 <strong>KingBox</strong> — Fast, private local media downloader & converter.
        </p>
        <p className={styles.subText}>
          Personal use only. Respect copyright and content owner rights.
        </p>
      </div>

      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </footer>
  );
};
