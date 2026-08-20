import React, { useState } from 'react';
import type { MediaInfo } from '../../types/media';
import { formatDuration } from '../../utils/formatDuration';
import styles from './MediaPreview.module.css';

interface MediaPreviewProps {
  mediaInfo: MediaInfo;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ mediaInfo }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const hasThumbnail = !!mediaInfo.thumbnailUrl && !imageError;

  return (
    <div className={styles.card} aria-label="Media Preview">
      <div className={styles.thumbnailContainer}>
        {hasThumbnail ? (
          <img
            src={mediaInfo.thumbnailUrl!}
            alt={mediaInfo.title || 'Media thumbnail'}
            className={styles.thumbnail}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.thumbnailPlaceholder}>
            <span className={styles.placeholderIcon}>🎵</span>
          </div>
        )}

        {mediaInfo.duration != null && (
          <span className={styles.durationBadge}>
            {formatDuration(mediaInfo.duration)}
          </span>
        )}
      </div>

      <div className={styles.details}>
        <h3 className={styles.title} title={mediaInfo.title || 'Untitled Media'}>
          {mediaInfo.title || 'Untitled Media'}
        </h3>

        {mediaInfo.sourceUrl && (
          <a
            href={mediaInfo.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
            title="Open original source link"
          >
            <span>Original Source</span> ↗
          </a>
        )}
      </div>
    </div>
  );
};
