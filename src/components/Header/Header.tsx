import React, { useState } from 'react';
import styles from './Header.module.css';
import { AboutModal } from '../AboutModal/AboutModal';

export const Header: React.FC = () => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.crownIcon} role="img" aria-label="KingBox Crown">👑</span>
          <span className={styles.brandName}>King<span className={styles.goldText}>Box</span></span>
        </div>

        <nav className={styles.nav} aria-label="Main Navigation">
          <button 
            type="button" 
            className={styles.navButton} 
            onClick={() => setShowInfoModal(true)}
            aria-label="About Us"
          >
            About Us
          </button>
        </nav>
      </div>

      <AboutModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </header>
  );
};
