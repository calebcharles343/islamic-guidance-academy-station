// FileInput.tsx
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FileInputProps {
  previewSource: string | null;
  onFileChange: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  previewSource,
  onFileChange,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setFileName(file.name);
    onFileChange(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-center text-sm font-bold w-24 h-24 border">
        {previewSource ? (
          <img
            src={previewSource}
            alt="avatar"
            className="object-cover w-full h-full"
          />
        ) : (
          "PASSPORT"
        )}
      </div>
      <input
        id="imageInput"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileInputChange}
      />
      <label
        htmlFor="imageInput"
        className="flex items-center justify-center text-[10px] border border-solid border-white bg-slate-800 rounded-sm cursor-pointer w-24 sm:w-24 p-2"
      >
        Upload Photo
      </Label>
      {fileName && <p className="text-xs text-gray-500 mt-1">{fileName}</p>}
    </div>
  );
};

export default FileInput;
