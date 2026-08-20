import { useState, useCallback, useEffect, useRef } from 'react';
import type { ConversionStatus } from '../types/media';
import { mediaApi } from '../services/mediaApi';
import { downloadBlob } from '../utils/downloadFile';

export interface UseConversionReturn {
  conversionId: string | null;
  status: ConversionStatus | null;
  progress: number | null;
  stage: string;
  fileName: string | null;
  error: string | null;
  isStarting: boolean;
  isCancelling: boolean;
  isDownloadingFile: boolean;
  startConversion: (url: string, format: string, quality: string) => Promise<boolean>;
  cancelConversion: () => Promise<boolean>;
  downloadResultFile: () => Promise<boolean>;
  reset: () => void;
}

export function useConversion(): UseConversionReturn {
  const [conversionId, setConversionId] = useState<string | null>(null);
  const [status, setStatus] = useState<ConversionStatus | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [stage, setStage] = useState<string>('Waiting');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [isDownloadingFile, setIsDownloadingFile] = useState<boolean>(false);

  const pollIntervalRef = useRef<number | null>(null);
  const activeJobIdRef = useRef<string | null>(null);

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current !== null) {
      window.clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  const pollProgress = useCallback(async (jobId: string) => {
    try {
      const data = await mediaApi.getProgress(jobId);
      setStatus(data.status);
      setProgress(data.progress);
      setStage(data.stage || data.status);
      if (data.fileName) setFileName(data.fileName);

      if (data.status === 'Completed') {
        stopPolling();
      } else if (data.status === 'Failed') {
        stopPolling();
        setError(data.errorMessage || 'Conversion failed. Please try again.');
      } else if (data.status === 'Cancelled') {
        stopPolling();
      }
    } catch (err: unknown) {
      // Don't stop immediately on a single transient poll failure
      console.warn('Poll error:', err);
    }
  }, [stopPolling]);

  const startConversion = useCallback(async (url: string, format: string, quality: string): Promise<boolean> => {
    stopPolling();
    setIsStarting(true);
    setError(null);
    setProgress(0);
    setFileName(null);
    setStatus('Pending');
    setStage('Queueing conversion...');

    try {
      const response = await mediaApi.startConversion({
        url: url.trim(),
        format: format.trim(),
        quality: quality.trim()
      });

      if (response.success && response.conversionId) {
        const jobId = response.conversionId;
        setConversionId(jobId);
        activeJobIdRef.current = jobId;
        setStatus('Pending');
        setStage(response.message || 'Queued in background');

        // Start polling every 1000ms
        pollIntervalRef.current = window.setInterval(() => {
          if (activeJobIdRef.current) {
            pollProgress(activeJobIdRef.current);
          }
        }, 1000);

        // Immediate first poll
        pollProgress(jobId);
        return true;
      } else {
        setError(response.message || 'Failed to start conversion.');
        setStatus('Failed');
        return false;
      }
    } catch (err: unknown) {
      const message = (err instanceof Error) ? err.message : 'Failed to start conversion.';
      setError(message);
      setStatus('Failed');
      return false;
    } finally {
      setIsStarting(false);
    }
  }, [pollProgress, stopPolling]);

  const cancelConversion = useCallback(async (): Promise<boolean> => {
    if (!conversionId) return false;

    setIsCancelling(true);
    try {
      const response = await mediaApi.cancelConversion(conversionId);
      stopPolling();
      setStatus('Cancelled');
      setStage('Conversion cancelled.');
      return response.success;
    } catch (err: unknown) {
      const message = (err instanceof Error) ? err.message : 'Could not cancel conversion.';
      setError(message);
      return false;
    } finally {
      setIsCancelling(false);
    }
  }, [conversionId, stopPolling]);

  const downloadResultFile = useCallback(async (): Promise<boolean> => {
    if (!conversionId || status !== 'Completed') return false;

    setIsDownloadingFile(true);
    setError(null);

    try {
      const fallback = fileName || `kingbox_${conversionId.slice(0, 8)}.media`;
      const { blob, fileName: serverName } = await mediaApi.downloadFile(conversionId, fallback);
      const targetName = serverName || fallback;
      const downloaded = await downloadBlob(blob, targetName);
      return downloaded;
    } catch (err: unknown) {
      const message = (err instanceof Error) ? err.message : 'Failed to download file.';
      setError(message);
      return false;
    } finally {
      setIsDownloadingFile(false);
    }
  }, [conversionId, status, fileName]);

  const reset = useCallback(() => {
    stopPolling();
    activeJobIdRef.current = null;
    setConversionId(null);
    setStatus(null);
    setProgress(null);
    setStage('Waiting');
    setFileName(null);
    setError(null);
    setIsStarting(false);
    setIsCancelling(false);
    setIsDownloadingFile(false);
  }, [stopPolling]);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    conversionId,
    status,
    progress,
    stage,
    fileName,
    error,
    isStarting,
    isCancelling,
    isDownloadingFile,
    startConversion,
    cancelConversion,
    downloadResultFile,
    reset
  };
}
