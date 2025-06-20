// utils/uploadCompressedImages.ts
import imageCompression from "browser-image-compression";
import { convertBlobUrlToFile } from "./convertBlobUrlFile";

export async function compressAndUpload(
  previewUrl: string,
  uploader: (formData: FormData) => Promise<string>
): Promise<string | null> {
  try {
    const file = await convertBlobUrlToFile(previewUrl);
    console.log("Converted file:", file);
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5,
      useWebWorker: true,
      maxWidthOrHeight: 1024,
    });
    console.log("Compressed type:", compressed.type, "size:", compressed.size);
    const formData = new FormData();
    formData.append("file", compressed);
    const url = await uploader(formData);

    return url;
  } catch (err) {
    console.error("compressAndUpload error:", err);
    return null;
  }
}
