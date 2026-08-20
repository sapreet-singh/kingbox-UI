export interface MediaInfoRequest {
  url: string;
}

export interface MediaInfo {
  title: string | null;
  duration: number | null;
  thumbnailUrl: string | null;
  sourceUrl: string | null;
  availableFormats: string[];
  availableQualities: string[];
}

export interface ConversionRequest {
  url: string;
  format: string;
  quality: string;
}

export interface ConversionResponse {
  success: boolean;
  conversionId: string;
  status: string;
  message: string;
}

export type ConversionStatus =
  | 'Pending'
  | 'Downloading'
  | 'Converting'
  | 'Finalizing'
  | 'Completed'
  | 'Failed'
  | 'Cancelled';

export interface ConversionProgress {
  id: string;
  status: ConversionStatus;
  progress: number | null;
  stage: string;
  fileName: string | null;
  errorMessage: string | null;
}

export interface CancelResponse {
  success: boolean;
  conversionId: string;
  status: string;
  message: string;
}

export interface ToolInfo {
  available: boolean;
  version: string | null;
  errorMessage: string | null;
}

export interface ToolStatus {
  ytDlp: ToolInfo;
  ffmpeg: ToolInfo;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorCode: string;
  errors?: Record<string, string[]>;
}
