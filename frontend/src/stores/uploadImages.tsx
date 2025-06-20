import { create } from "zustand";

export type FileImage = {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
  status: "pending" | "uploading" | "uploaded" | "error";
};

type ImagesState = {
  images: FileImage[];
  addImage: (image: FileImage) => void;
  uploadImage: (index: number, data: Partial<FileImage>) => void;
};

const useImagesStore = create<ImagesState>((set) => ({
  images: [],
  addImage: (image) =>
    set((state) => ({
      images: [...state.images, image],
    })),
  uploadImage: (index, data) =>
    set((state) => {
      const updated = [...state.images];
      updated[index] = { ...updated[index], ...data };
      return { images: updated };
    }),
}));

export default useImagesStore;
