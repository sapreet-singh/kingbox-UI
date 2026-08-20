import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  currentPage?: 'home' | 'about';
  onNavigate?: (page: 'home' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <button type="button" className={styles.linkBtn} onClick={() => onNavigate?.('home')}>
            Downloader
          </button>
          <button type="button" className={styles.linkBtn} onClick={() => onNavigate?.('about')}>
            About Us
          </button>
          <button type="button" className={styles.linkBtn} onClick={() => onNavigate?.('about')}>
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
    </footer>
  );
};
