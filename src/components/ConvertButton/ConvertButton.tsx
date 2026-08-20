import React from 'react';
import styles from './ConvertButton.module.css';

interface ConvertButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ConvertButton: React.FC<ConvertButtonProps> = ({
  onClick,
  isLoading,
  disabled = false
}) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label="Start conversion"
    >
      {isLoading ? (
        <span className={styles.loadingWrapper}>
          <span className="animate-spin">⚙️</span>
          <span>Starting Conversion...</span>
        </span>
      ) : (
        <span>Convert</span>
      )}
    </button>
  );
};
