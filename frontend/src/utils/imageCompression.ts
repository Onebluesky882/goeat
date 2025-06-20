import imageCompression from "browser-image-compression";
import { convertBlobUrlToFile } from "./convertBlobUrlFile";

export async function compressAndUpload(
  previewUrl: string,
  uploader: (formData: FormData) => Promise<string>
): Promise<string | null> {
  try {
    const file = await convertBlobUrlToFile(previewUrl);

    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5,
      useWebWorker: true,
      maxWidthOrHeight: 1024,
    });

    // 🟡 Rename the compressed file here
    const renamedCompressed = new File([compressed], file.name, {
      type: compressed.type,
    });

    const formData = new FormData();
    formData.append("file", renamedCompressed);

    const url = await uploader(formData);

    console.log("Original:", file.name, file.size);
    console.log("Compressed:", renamedCompressed.name, renamedCompressed.size);

    return url;
  } catch (err) {
    return null;
  }
}
