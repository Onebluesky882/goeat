import { uploadImageApi } from "@/Api/uploadImage.api";
import useImagesStore from "@/stores/uploadImages";
import { compressAndUpload } from "@/utils/imageCompression";

const useImages = () => {
  const images = useImagesStore((state) => state.images);
  const addImage = useImagesStore((state) => state.addImage);
  const uploadImage = useImagesStore((state) => state.uploadImage);

  const upload = async () => {
    const uploadedUrl = await Promise.all(
      images.map(async (img, index) => {
        uploadImage(index, { status: "uploading" });

        const result = await compressAndUpload(
          img.previewUrl,
          async (formData) => {
            const res = await uploadImageApi.create(formData);
            return res.data.url || res.data;
          }
        );
        if (result) {
          uploadImage(index, { status: "uploaded", uploadedUrl: result });
          console.log("hook", images);
          console.log("uploadedUrl hook", uploadedUrl);
          return result;
        } else {
          uploadImage(index, { status: "error" });
          return null;
        }
      })
    );
    return uploadedUrl.filter((url): url is string => url !== null);
  };

  return { upload, images, addImage, uploadImage };
};
export default useImages;
