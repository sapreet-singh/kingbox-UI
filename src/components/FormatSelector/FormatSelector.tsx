import React from 'react';
import styles from './FormatSelector.module.css';

interface FormatSelectorProps {
  formats: string[];
  selectedFormat: string;
  onChange: (format: string) => void;
  disabled?: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  formats,
  selectedFormat,
  onChange,
  disabled = false
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor="format-select" className={styles.label}>
        Format
      </label>
      <div className={styles.selectWrapper}>
        <select
          id="format-select"
          className={styles.select}
          value={selectedFormat}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {formats.map((fmt) => (
            <option key={fmt} value={fmt}>
              {fmt.toUpperCase()} {fmt.toLowerCase() === 'mp3' ? '(Audio)' : fmt.toLowerCase() === 'mp4' ? '(Video)' : ''}
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
