import { useState, useRef, ChangeEvent } from "react";
import { Camera, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const PhotoUpload = ({ value, onChange, error }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("फ़ाइल का आकार 5MB से कम होना चाहिए");
        return;
      }
      
      if (!file.type.startsWith("image/")) {
        alert("कृपया केवल इमेज फ़ाइल अपलोड करें");
        return;
      }

      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="form-label">
        पासपोर्ट साइज़ फोटो <span className="text-destructive">*</span>
      </label>
      
      <div
        className={cn(
          "relative w-40 h-48 border-2 border-dashed rounded-lg overflow-hidden transition-all duration-200 cursor-pointer hover:border-primary",
          error ? "border-destructive" : "border-input",
          preview ? "border-solid" : ""
        )}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:bg-destructive/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
            <Camera className="w-10 h-10 mb-2 text-primary/60" />
            <span className="text-xs text-center font-devanagari">
              फोटो अपलोड करें
            </span>
            <Upload className="w-5 h-5 mt-2 text-primary/40" />
          </div>
        )}
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      <p className="text-xs text-muted-foreground">
        अधिकतम आकार: 5MB | फॉर्मेट: JPG, PNG
      </p>
      
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default PhotoUpload;
