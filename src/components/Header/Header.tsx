import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  currentPage?: 'home' | 'about';
  onNavigate?: (page: 'home' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onNavigate }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand} onClick={() => onNavigate?.('home')} role="button" tabIndex={0}>
          <span className={styles.crownIcon} role="img" aria-label="KingBox Crown">👑</span>
          <span className={styles.brandName}>King<span className={styles.goldText}>Box</span></span>
        </div>

        <nav className={styles.nav} aria-label="Main Navigation">
          <button 
            type="button" 
            className={`${styles.navButton} ${currentPage === 'home' ? styles.activeNav : ''}`}
            onClick={() => onNavigate?.('home')}
            aria-label="Home Converter"
          >
            Downloader
          </button>
          <button 
            type="button" 
            className={`${styles.navButton} ${currentPage === 'about' ? styles.activeNav : ''}`}
            onClick={() => onNavigate?.('about')}
            aria-label="About Us"
          >
            About Us
          </button>
        </nav>
      </div>
    </header>
  );
};
