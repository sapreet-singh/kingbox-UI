import React from 'react';
import type { ConversionStatus } from '../../types/media';
import styles from './ConversionProgress.module.css';

interface ConversionProgressProps {
  status: ConversionStatus;
  progress: number | null;
  stage: string;
  onCancel: () => void;
  isCancelling: boolean;
}

export const ConversionProgress: React.FC<ConversionProgressProps> = ({
  status,
  progress,
  stage,
  onCancel,
  isCancelling
}) => {
  const getStatusTitle = () => {
    switch (status) {
      case 'Pending':
        return 'Preparing in queue...';
      case 'Downloading':
        return 'Downloading source media...';
      case 'Converting':
        return 'Converting audio/video...';
      case 'Finalizing':
        return 'Finalizing output file...';
      case 'Completed':
        return 'Conversion complete!';
      case 'Cancelled':
        return 'Conversion cancelled.';
      case 'Failed':
        return 'Conversion failed.';
      default:
        return stage || 'Processing...';
    }
  };

  const isIndeterminate = progress === null || progress === undefined;
  const displayPct = !isIndeterminate ? Math.round(progress) : null;

  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={styles.header}>
        <div className={styles.statusInfo}>
          <span className={styles.stageIcon}>
            {status === 'Downloading' ? '📥' : status === 'Converting' ? '⚙️' : status === 'Finalizing' ? '✨' : '⏳'}
          </span>
          <div className={styles.textGroup}>
            <h4 className={styles.statusTitle}>{getStatusTitle()}</h4>
            <p className={styles.stageDescription}>{stage}</p>
          </div>
        </div>

        {displayPct !== null && (
          <span className={styles.percentageText}>{displayPct}%</span>
        )}
      </div>

      <div className={styles.progressTrack}>
        <div
          className={`${styles.progressBar} ${isIndeterminate ? styles.indeterminate : ''}`}
          style={{ width: !isIndeterminate ? `${Math.min(Math.max(progress, 0), 100)}%` : '100%' }}
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
          disabled={isCancelling || status === 'Completed'}
          aria-label="Cancel conversion"
        >
          {isCancelling ? 'Cancelling...' : 'Cancel Conversion'}
        </button>
      </div>
    </div>
  );
};
