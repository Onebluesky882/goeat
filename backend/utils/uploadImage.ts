import imageCompression from 'browser-image-compression';

/**
 * Converts a Blob URL to a File.
 */
export async function convertBlobUrlToFile(
  blobUrl: string,
  filename = 'image.jpg',
): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

/**
 * Compresses and uploads multiple preview Blob URLs.
 * @param previewUrls - Array of Blob URLs
 * @returns Array of uploaded image URLs
 */
export async function uploadImages(previewUrls: string[]): Promise<string[]> {
  if (previewUrls.length === 0) return [];

  const options = {
    maxSizeMB: 0.5,
    useWebWorker: true,
    maxWidthOrHeight: 1024,
  };

  const uploadPromises = previewUrls.map(async (url, index) => {
    try {
      const file = await convertBlobUrlToFile(url, `image_${index}.jpg`);
      const compressed = await imageCompression(file, options);

      const formData = new FormData();
      formData.append('file', compressed);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const { url: publicUrl } = await res.json();
      return publicUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => url !== null);
}
