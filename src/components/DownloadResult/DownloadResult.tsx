import React from 'react';
import styles from './DownloadResult.module.css';

interface DownloadResultProps {
  fileName: string | null;
  onDownload: () => void;
  onConvertAnother: () => void;
  isDownloading: boolean;
}

export const DownloadResult: React.FC<DownloadResultProps> = ({
  fileName,
  onDownload,
  onConvertAnother,
  isDownloading
}) => {
  return (
    <div className={styles.container} role="region" aria-label="Conversion Complete">
      <div className={styles.successBadge}>
        <span className={styles.checkIcon}>✓</span>
        <h3 className={styles.title}>Conversion Complete!</h3>
      </div>

      <div className={styles.fileCard}>
        <span className={styles.fileIcon}>📁</span>
        <div className={styles.fileDetails}>
          <span className={styles.fileName}>{fileName || 'Ready for download'}</span>
          <span className={styles.fileStatus}>Ready to save to your device</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.downloadButton}
          onClick={onDownload}
          disabled={isDownloading}
          aria-label="Download media file"
        >
          {isDownloading ? (
            <span className={styles.btnContent}>
              <span className="animate-spin">⏳</span> Saving File...
            </span>
          ) : (
            <span className={styles.btnContent}>
              <span>⬇️</span> Download File
            </span>
          )}
        </button>

        <button
          type="button"
          className={styles.resetButton}
          onClick={onConvertAnother}
          disabled={isDownloading}
          aria-label="Convert another media file"
        >
          🔄 Convert Another
        </button>
      </div>
    </div>
  );
};
