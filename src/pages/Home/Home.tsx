import React, { useState, useEffect } from 'react';
import { useMediaInfo } from '../../hooks/useMediaInfo';
import { useConversion } from '../../hooks/useConversion';
import { ToolStatusBanner } from '../../components/ToolStatusBanner/ToolStatusBanner';
import { UrlInput } from '../../components/UrlInput/UrlInput';
import { MediaPreview } from '../../components/MediaPreview/MediaPreview';
import { FormatSelector } from '../../components/FormatSelector/FormatSelector';
import { QualitySelector } from '../../components/QualitySelector/QualitySelector';
import { ConvertButton } from '../../components/ConvertButton/ConvertButton';
import { ConversionProgress } from '../../components/ConversionProgress/ConversionProgress';
import { DownloadResult } from '../../components/DownloadResult/DownloadResult';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('mp3');
  const [selectedQuality, setSelectedQuality] = useState<string>('320');

  const {
    mediaInfo,
    loading: isFetchingInfo,
    error: infoError,
    fetchMediaInfo,
    reset: resetInfo
  } = useMediaInfo();

  const {
    status: conversionStatus,
    progress: conversionProgress,
    stage: conversionStage,
    fileName: convertedFileName,
    error: conversionError,
    isStarting: isStartingConversion,
    isCancelling,
    isDownloadingFile,
    startConversion,
    cancelConversion,
    downloadResultFile,
    reset: resetConversion
  } = useConversion();

  // Set default format & quality when mediaInfo arrives
  useEffect(() => {
    if (mediaInfo) {
      const defaultFormat = mediaInfo.availableFormats?.[0] || 'mp3';
      setSelectedFormat(defaultFormat);

      const defaultQuality = mediaInfo.availableQualities?.includes('320')
        ? '320'
        : (mediaInfo.availableQualities?.[0] || '192');
      setSelectedQuality(defaultQuality);
    }
  }, [mediaInfo]);

  const handleGetInfo = () => {
    resetConversion();
    fetchMediaInfo(url);
  };

  const handleStartConversion = () => {
    if (!url || !selectedFormat || !selectedQuality) return;
    startConversion(url, selectedFormat, selectedQuality);
  };

  const handleConvertAnother = () => {
    setUrl('');
    resetInfo();
    resetConversion();
  };

  const isConverting = !!conversionStatus && (
    conversionStatus === 'Pending' ||
    conversionStatus === 'Downloading' ||
    conversionStatus === 'Converting' ||
    conversionStatus === 'Finalizing'
  );

  const isCompleted = conversionStatus === 'Completed';
  const isCancelled = conversionStatus === 'Cancelled';

  const activeError = infoError || conversionError;

  return (
    <main className={styles.main}>
      <div className="container">
        <ToolStatusBanner />

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBadge}>
            <span>⚡ Ultra-fast & Private</span>
          </div>
          <h1 className={styles.heroTitle}>
            Download & Convert <br />
            <span className={styles.gradientText}>Your Media, Your Way</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Convert video and audio links to high-quality MP3 and MP4 in seconds.
          </p>
        </section>

        {/* Main Card */}
        <div className={styles.cardContainer}>
          {/* URL Input Form */}
          <UrlInput
            url={url}
            onChange={setUrl}
            onSubmit={handleGetInfo}
            isLoading={isFetchingInfo}
            disabled={isConverting}
          />

          {/* Active Error Notice */}
          <ErrorMessage
            message={activeError}
            onDismiss={() => {
              if (infoError) resetInfo();
              if (conversionError) resetConversion();
            }}
          />

          {/* Media Info & Configuration State */}
          {mediaInfo && !isConverting && !isCompleted && (
            <div className={styles.configurationSection}>
              <MediaPreview mediaInfo={mediaInfo} />

              <div className={styles.selectorsRow}>
                <FormatSelector
                  formats={mediaInfo.availableFormats.length > 0 ? mediaInfo.availableFormats : ['mp3', 'mp4']}
                  selectedFormat={selectedFormat}
                  onChange={setSelectedFormat}
                  disabled={isConverting}
                />

                <QualitySelector
                  qualities={mediaInfo.availableQualities.length > 0 ? mediaInfo.availableQualities : ['128', '192', '256', '320']}
                  selectedQuality={selectedQuality}
                  format={selectedFormat}
                  onChange={setSelectedQuality}
                  disabled={isConverting}
                />
              </div>

              <ConvertButton
                onClick={handleStartConversion}
                isLoading={isStartingConversion}
                disabled={isConverting}
              />
            </div>
          )}

          {/* Conversion Progress State */}
          {isConverting && (
            <ConversionProgress
              status={conversionStatus}
              progress={conversionProgress}
              stage={conversionStage}
              onCancel={cancelConversion}
              isCancelling={isCancelling}
            />
          )}

          {/* Completed Download State */}
          {isCompleted && (
            <DownloadResult
              fileName={convertedFileName}
              onDownload={downloadResultFile}
              onConvertAnother={handleConvertAnother}
              isDownloading={isDownloadingFile}
            />
          )}

          {/* Cancelled State */}
          {isCancelled && (
            <div className={styles.cancelledBox}>
              <p>Conversion was cancelled.</p>
              <button
                type="button"
                className={styles.tryAgainBtn}
                onClick={handleConvertAnother}
              >
                Start New Conversion
              </button>
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <section className={styles.featuresSection} aria-label="Key Features">
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🎵</span>
            <h3>Crystal Clear Audio</h3>
            <p>Export in crisp MP3 audio up to 320 kbps bitrates.</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🔒</span>
            <h3>100% Private</h3>
            <p>Processed directly on your local system with zero server data retention.</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>⚡</span>
            <h3>No Restrictions</h3>
            <p>No arbitrary file queues, no sign-ups, and no artificial throttles.</p>
          </div>
        </section>
      </div>
    </main>
  );
};
