import React, { useEffect, useState } from 'react';
import type { ToolStatus } from '../../types/media';
import { mediaApi } from '../../services/mediaApi';
import styles from './ToolStatusBanner.module.css';

export const ToolStatusBanner: React.FC = () => {
  const [toolStatus, setToolStatus] = useState<ToolStatus | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    mediaApi.getToolStatus()
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setToolStatus(res.data);
        }
      })
      .catch(() => {
        // Handled silently if backend is offline; Home handles network offline
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (dismissed || !toolStatus) return null;

  const isYtDlpMissing = !toolStatus.ytDlp.available;
  const isFfmpegMissing = !toolStatus.ffmpeg.available;

  if (!isYtDlpMissing && !isFfmpegMissing) return null;

  return (
    <div className={styles.banner} role="status">
      <div className={styles.bannerContent}>
        <span className={styles.icon}>⚠️</span>
        <div className={styles.text}>
          <strong>Media Engine Setup Notice:</strong>
          {isYtDlpMissing && isFfmpegMissing ? (
            <span> yt-dlp and FFmpeg are not yet configured on this system. Please check your backend setup.</span>
          ) : isYtDlpMissing ? (
            <span> yt-dlp is not currently accessible. Media information retrieval may be limited.</span>
          ) : (
            <span> FFmpeg is not currently accessible. Audio and video transcoding may be limited.</span>
          )}
        </div>
      </div>
      <button 
        type="button" 
        className={styles.dismissBtn} 
        onClick={() => setDismissed(true)} 
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
};
