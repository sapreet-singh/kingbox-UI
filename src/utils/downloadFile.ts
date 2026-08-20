/**
 * Triggers file download using the File System Access API when available,
 * or standard browser object URL download fallback.
 */
export async function downloadBlob(blob: Blob, suggestedFileName: string): Promise<boolean> {
  const safeName = suggestedFileName || 'media_download';

  // Try modern File System Access API if supported in browser
  if ('showSaveFilePicker' in window) {
    try {
      const ext = safeName.includes('.') ? safeName.split('.').pop() : 'bin';
      const handle = await (window as unknown as {
        showSaveFilePicker: (options: unknown) => Promise<{
          createWritable: () => Promise<{
            write: (data: Blob) => Promise<void>;
            close: () => Promise<void>;
          }>;
        }>;
      }).showSaveFilePicker({
        suggestedName: safeName,
        types: [
          {
            description: 'Media File',
            accept: {
              [blob.type || 'application/octet-stream']: [`.${ext}`]
            }
          }
        ]
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    } catch (err: unknown) {
      // User aborted or file system access denied -> fallback to standard download
      if ((err as { name?: string }).name === 'AbortError') {
        return false;
      }
    }
  }

  // Standard fallback browser download
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Cleanup after a brief delay
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 1000);

  return true;
}

/**
 * Extracts a filename from the Content-Disposition HTTP header.
 */
export function extractFileNameFromHeader(dispositionHeader: string | null, fallback: string): string {
  if (!dispositionHeader) return fallback;

  // Check for filename*=UTF-8''... format
  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(dispositionHeader);
  if (utf8Match && utf8Match[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  // Check for standard filename="..."
  const standardMatch = /filename="?([^";]+)"?/i.exec(dispositionHeader);
  if (standardMatch && standardMatch[1]) {
    return standardMatch[1].trim();
  }

  return fallback;
}
