import React, { useState } from 'react';
import styles from './Header.module.css';

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
            aria-label="About KingBox"
          >
            About
          </button>
        </nav>
      </div>

      {showInfoModal && (
        <div className={styles.modalOverlay} onClick={() => setShowInfoModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>👑 About KingBox</h3>
              <button 
                type="button" 
                className={styles.closeButton} 
                onClick={() => setShowInfoModal(false)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <p><strong>KingBox</strong> is your personal media converter and downloader.</p>
              <p>All processing is executed on temporary storage and saved directly to your local computer.</p>
              <ul className={styles.infoList}>
                <li>⚡ High quality audio extraction (MP3 up to 320 kbps)</li>
                <li>🎬 Video remuxing and transcoding (MP4)</li>
                <li>🔒 Zero persistent server storage or database tracking</li>
              </ul>
            </div>
            <div className={styles.modalFooter}>
              <button type="button" className={styles.primaryModalBtn} onClick={() => setShowInfoModal(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
