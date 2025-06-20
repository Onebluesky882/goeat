export async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
  const res = await fetch(blobUrl);
  const blob = await res.blob();
  const mime = blob.type || "image/jpeg"; // fallback
  return new File([blob], "upload.jpg", { type: mime });
}
