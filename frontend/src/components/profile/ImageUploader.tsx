import React, { useRef, useState } from "react";
import { X, User } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (avatar: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
      onChange(url);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    // Clear file input value
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full bg-gradient-to-tr from-[#d6bcfa]/50 to-[#9b87f5]/60 border-4 border-[#9b87f5]/50 shadow-lg overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Avatar preview"
            className="object-cover rounded-full w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f1f0fb] dark:bg-[#191731]">
            <User size={56} className="text-[#8e9196]" />
          </div>
        )}
        {preview && (
          <button
            type="button"
            className="absolute top-2 right-2 bg-white/80 dark:bg-[#2D223F]/90 rounded-full p-1 shadow-md z-10 backdrop-blur-md hover:bg-pink-100 dark:hover:bg-[#403E43]"
            aria-label="Remove current image"
            onClick={handleRemove}
          >
            <X size={16} className="text-[#1A1F2C]" />
          </button>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        className="hidden"
        onChange={handleImageChange}
      />
      <button
        type="button"
        className="mt-2 text-[#7E69AB] hover:text-[#9b87f5] underline text-sm font-medium"
        onClick={() => fileInput.current?.click()}
      >
        {preview ? "Change Photo" : "Upload Photo"}
      </button>
    </div>
  );
};

export default ImageUploader;
