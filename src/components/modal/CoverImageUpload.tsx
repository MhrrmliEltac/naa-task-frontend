import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import GalleryIcon from "../../assets/icons/GalleryIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { truncateWord } from "../../helpers/truncateFunc";
import CancelIcon from "../../assets/icons/CancelIcon";

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

export interface CoverImageUploadProps {
  onFileChange?: (file: File | null) => void;
  src: string;
}

const CoverImageUpload = ({ onFileChange, src }: CoverImageUploadProps) => {
  const [previewImage, setPreviewImage] = useState<string>(src || "");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);

    if (onFileChange) onFileChange(files[0]);
  };

  const handleButtonClick = () => fileInputRef.current?.click();
  const handleRemove = () => {
    setPreviewImage("");
    setFileName("");
    if (onFileChange) onFileChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-2 text-[14px] font-medium text-[#374151]">
        Cover Image
        <button
          type="button"
          onClick={handleButtonClick}
          className="flex items-center justify-center gap-2 p-2 border border-[#F0F0F0] rounded-[10px] cursor-pointer"
        >
          <GalleryIcon width="16px" height="20px" fill="#787486" />
          <span className="text-[#787486]">Upload Cover Image</span>
          <VisuallyHiddenInput
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </button>
      </label>

      {previewImage && (
        <div className="relative w-full max-w-32">
          <img
            src={previewImage}
            alt="preview"
            className="object-cover w-full h-24"
          />
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex justify-center items-center"
          >
            <DeleteIcon width="12px" height="12px" fill="#D82C2C" />
          </button>
        </div>
      )}

      {fileName && (
        <div className="flex items-center gap-2 border border-[#3DB23F] rounded-full px-2 py-0.5 max-w-[108px] h-6">
          <span className="text-[12px] text-[#3DB23F]">
            {truncateWord(fileName, 10)}
          </span>
          <button onClick={handleRemove}>
            <CancelIcon width="6px" height="6px" fill="white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverImageUpload;
