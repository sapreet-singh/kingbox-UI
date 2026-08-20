import React from 'react';
import styles from './QualitySelector.module.css';

interface QualitySelectorProps {
  qualities: string[];
  selectedQuality: string;
  format: string;
  onChange: (quality: string) => void;
  disabled?: boolean;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({
  qualities,
  selectedQuality,
  format,
  onChange,
  disabled = false
}) => {
  const formatQualityLabel = (quality: string) => {
    if (format.toLowerCase() === 'mp3') {
      return `${quality} kbps ${quality === '320' ? '⚡ (Best)' : quality === '128' ? '(Standard)' : ''}`;
    }
    return quality;
  };

  return (
    <div className={styles.container}>
      <label htmlFor="quality-select" className={styles.label}>
        Quality
      </label>
      <div className={styles.selectWrapper}>
        <select
          id="quality-select"
          className={styles.select}
          value={selectedQuality}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {qualities.map((q) => (
            <option key={q} value={q}>
              {formatQualityLabel(q)}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          ▼
        </span>
      </div>
    </div>
  );
};
