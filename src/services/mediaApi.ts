import type {
  ApiResponse,
  ApiErrorResponse,
  MediaInfo,
  MediaInfoRequest,
  ConversionRequest,
  ConversionResponse,
  ConversionProgress,
  CancelResponse,
  ToolStatus
} from '../types/media';
import { extractFileNameFromHeader } from '../utils/downloadFile';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://localhost:7085').replace(/\/+$/, '');

class ApiError extends Error {
  errorCode: string;
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, errorCode: string = 'API_ERROR', status: number = 500, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.errorCode = errorCode;
    this.status = status;
    this.errors = errors;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ApiErrorResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      // Ignore JSON parse error
    }

    const message = errorData?.message || `Server responded with status ${response.status} (${response.statusText})`;
    const code = errorData?.errorCode || `HTTP_${response.status}`;
    throw new ApiError(message, code, response.status, errorData?.errors);
  }

  return response.json();
}

async function safeFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  try {
    return await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...options?.headers
      }
    });
  } catch (err: unknown) {
    const errorMsg = (err instanceof Error) ? err.message : String(err);
    if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError') || errorMsg.includes('ERR_CONNECTION_REFUSED')) {
      throw new ApiError(
        'KingBox API is unavailable. Please make sure the backend server is running.',
        'NETWORK_UNAVAILABLE',
        0
      );
    }
    throw new ApiError('Network request failed. Please check your internet connection.', 'NETWORK_ERROR', 0);
  }
}

export const mediaApi = {
  /**
   * Health status check.
   */
  async checkHealth(): Promise<{ status: string; application: string }> {
    const res = await safeFetch('/api/health');
    return handleResponse(res);
  },

  /**
   * Tool readiness check.
   */
  async getToolStatus(): Promise<ApiResponse<ToolStatus>> {
    const res = await safeFetch('/api/media/tools/status');
    return handleResponse(res);
  },

  /**
   * Retrieve media metadata from URL.
   */
  async getMediaInfo(url: string): Promise<ApiResponse<MediaInfo>> {
    const body: MediaInfoRequest = { url };
    const res = await safeFetch('/api/media/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return handleResponse(res);
  },

  /**
   * Start a new conversion job.
   */
  async startConversion(request: ConversionRequest): Promise<ConversionResponse> {
    const res = await safeFetch('/api/media/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    return handleResponse(res);
  },

  /**
   * Get live progress of an existing conversion job.
   */
  async getProgress(conversionId: string): Promise<ConversionProgress> {
    const res = await safeFetch(`/api/media/progress/${conversionId}`);
    return handleResponse(res);
  },

  /**
   * Cancel an active or queued conversion job.
   */
  async cancelConversion(conversionId: string): Promise<CancelResponse> {
    const res = await safeFetch(`/api/media/cancel/${conversionId}`, {
      method: 'POST'
    });
    return handleResponse(res);
  },

  /**
   * Download the finalized converted media file stream.
   */
  async downloadFile(conversionId: string, fallbackFileName: string): Promise<{ blob: Blob; fileName: string }> {
    const url = `${API_BASE_URL}/api/media/download/${conversionId}`;
    let res: Response;
    try {
      res = await fetch(url, { method: 'GET' });
    } catch (err: unknown) {
      const errorMsg = (err instanceof Error) ? err.message : String(err);
      if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
        throw new ApiError('Download failed: KingBox API is unreachable.', 'NETWORK_ERROR', 0);
      }
      throw new ApiError('Download failed due to network error.', 'NETWORK_ERROR', 0);
    }

    if (!res.ok) {
      let errorData: ApiErrorResponse | null = null;
      try {
        errorData = await res.json();
      } catch {
        // Not JSON
      }
      const message = errorData?.message || `Download failed with HTTP ${res.status}`;
      throw new ApiError(message, errorData?.errorCode || `HTTP_${res.status}`, res.status);
    }

    const disposition = res.headers.get('Content-Disposition');
    const fileName = extractFileNameFromHeader(disposition, fallbackFileName);
    const blob = await res.blob();

    return { blob, fileName };
  }
};
