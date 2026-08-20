import React, { useState, useEffect } from 'react';
import styles from './UrlInput.module.css';

interface UrlInputProps {
  url: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  url,
  onChange,
  onSubmit,
  isLoading,
  disabled = false
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (!touched || !url) {
      setValidationError(null);
      return;
    }

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError('URL cannot be empty.');
      return;
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        setValidationError('Please enter a valid HTTP or HTTPS URL.');
      } else {
        setValidationError(null);
      }
    } catch {
      setValidationError('Please enter a valid URL (e.g. https://example.com/video).');
    }
  }, [url, touched]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setTouched(true);
        onChange(text.trim());
      }
    } catch {
      // Clipboard permissions denied or unsupported
    }
  };

  const handleClear = () => {
    onChange('');
    setTouched(false);
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError('Please enter a media URL.');
      return;
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        setValidationError('Please enter a valid HTTP or HTTPS URL.');
        return;
      }
    } catch {
      setValidationError('Please enter a valid URL.');
      return;
    }

    onSubmit();
  };

  const isInvalid = !!validationError;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={`${styles.inputWrapper} ${isInvalid ? styles.hasError : ''}`}>
        <span className={styles.linkIcon} aria-hidden="true">
          🔗
        </span>

        <input
          type="url"
          className={styles.input}
          placeholder="Paste your media URL here (e.g. YouTube, SoundCloud, Vimeo)..."
          value={url}
          onChange={(e) => {
            setTouched(true);
            onChange(e.target.value);
          }}
          disabled={disabled || isLoading}
          aria-label="Media URL input"
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? 'url-error' : undefined}
          autoComplete="off"
          spellCheck="false"
        />

        <div className={styles.actions}>
          {url ? (
            <button
              type="button"
              className={styles.iconButton}
              onClick={handleClear}
              disabled={disabled || isLoading}
              title="Clear input"
              aria-label="Clear URL input"
            >
              ✕
            </button>
          ) : (
            <button
              type="button"
              className={styles.pasteButton}
              onClick={handlePaste}
              disabled={disabled || isLoading}
              title="Paste from clipboard"
              aria-label="Paste URL from clipboard"
            >
              📋 Paste
            </button>
          )}
        </div>
      </div>

      {isInvalid && (
        <p id="url-error" className={styles.errorText} role="alert">
          {validationError}
        </p>
      )}

      <div className={styles.submitContainer}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={disabled || isLoading || !url.trim() || isInvalid}
        >
          {isLoading ? (
            <span className={styles.loadingContent}>
              <span className="animate-spin">⏳</span> Fetching Info...
            </span>
          ) : (
            'Get Info'
          )}
        </button>
      </div>
    </form>
  );
};
