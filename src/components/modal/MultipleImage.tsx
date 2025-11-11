import { styled } from "@mui/material";
import { useRef, useState } from "react";
import UploadIcon from "../../assets/icons/UploadIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";

interface MultipleImageProps {
  onFilesChange?: (files: File[]) => void;
  galleryImages: string[];
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MultipleImage = ({
  onFilesChange,
  galleryImages,
}: MultipleImageProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>(
    galleryImages || []
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const allFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(allFiles);

    // Preview üçün base64
    const readFilesAsBase64 = newFiles.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readFilesAsBase64).then((base64Files) => {
      setPreviewImages((prev) => [...prev, ...base64Files]);
    });

    if (onFilesChange) onFilesChange(allFiles);
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleRemove = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
    if (onFilesChange) onFilesChange(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={handleButtonClick}
        className="flex flex-col justify-center items-center gap-3.5 p-2 border border-[#F0F0F0] shadow-sidebar rounded-[10px] cursor-pointer h-[180px]"
      >
        <UploadIcon />
        <span className="text-[#787486] font-normal leading-6 text-base">
          Upload images
        </span>
        <VisuallyHiddenInput
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
      </button>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {previewImages.map((src, index) => (
            <div
              key={index}
              className="relative group rounded-[10px] w-full max-w-32 overflow-hidden"
            >
              <img
                src={src}
                alt={`preview-${index}`}
                className="object-cover w-full h-24"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-white flex justify-center items-center rounded-full opacity-0 cursor-pointer group-hover:opacity-100 transition w-5 h-5"
              >
                <DeleteIcon width="12px" height="12px" fill="#D82C2C" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleImage;
