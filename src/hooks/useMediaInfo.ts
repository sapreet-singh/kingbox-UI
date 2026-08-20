import { useState, useCallback } from 'react';
import type { MediaInfo } from '../types/media';
import { mediaApi } from '../services/mediaApi';

export interface UseMediaInfoReturn {
  mediaInfo: MediaInfo | null;
  loading: boolean;
  error: string | null;
  fetchMediaInfo: (url: string) => Promise<boolean>;
  reset: () => void;
}

export function useMediaInfo(): UseMediaInfoReturn {
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMediaInfo = useCallback(async (url: string): Promise<boolean> => {
    if (!url || !url.trim()) {
      setError('Please enter a valid media URL.');
      return false;
    }

    setLoading(true);
    setError(null);
    setMediaInfo(null);

    try {
      const response = await mediaApi.getMediaInfo(url.trim());
      if (response.success && response.data) {
        setMediaInfo(response.data);
        return true;
      } else {
        setError(response.message || 'Could not retrieve media details for this URL.');
        return false;
      }
    } catch (err: unknown) {
      const message = (err instanceof Error) ? err.message : 'Failed to retrieve media information.';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMediaInfo(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    mediaInfo,
    loading,
    error,
    fetchMediaInfo,
    reset
  };
}
