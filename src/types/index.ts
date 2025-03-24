
export interface DetectionResult {
  isGenuine: boolean;
  confidence: number;
  features?: {
    watermark?: {
      detected: boolean;
      confidence: number;
    };
    serialNumber?: {
      detected: boolean;
      value?: string;
      confidence: number;
    };
    securityThread?: {
      detected: boolean;
      confidence: number;
    };
    microprinting?: {
      detected: boolean;
      confidence: number;
    };
  };
  message?: string;
}

export type DetectionStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export interface UploadedImage {
  file: File;
  preview: string;
}
