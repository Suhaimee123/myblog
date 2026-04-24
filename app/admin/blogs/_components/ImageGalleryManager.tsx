"use client";

import { Plus } from "lucide-react";
import Button from "@/app/components/ui/Button";
import ImageUploadField from "./ImageUploadField";
import { toast } from "sonner";

export interface ImageState {
  url?: string;
  file?: File;
  preview?: string;
}

interface ImageGalleryManagerProps {
  images: ImageState[];
  setImages: (images: ImageState[]) => void;
  maxImages?: number;
  onRemoveExistingImage?: (url: string) => void;
}

export default function ImageGalleryManager({ 
  images, 
  setImages, 
  maxImages = 10,
  onRemoveExistingImage
}: ImageGalleryManagerProps) {
  const handleFileSelect = (index: number, file: File, preview: string) => {
    const newImages = [...images];
    if (newImages[index].url && onRemoveExistingImage) {
      onRemoveExistingImage(newImages[index].url as string);
    }
    newImages[index] = { file, preview };
    setImages(newImages);
  };

  const addImageField = () => {
    if (images.length >= maxImages) {
      toast.error(`อัปโหลดรูปภาพได้สูงสุด ${maxImages} รูปเท่านั้น`);
      return;
    }
    setImages([...images, {}]);
  };

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      if (images[index].url && onRemoveExistingImage) {
        onRemoveExistingImage(images[index].url as string);
      }
      setImages(images.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      {images.map((img, index) => (
        <ImageUploadField
          key={index}
          url={img.url}
          preview={img.preview}
          isCover={index === 0}
          onFileSelect={(file, preview) => handleFileSelect(index, file, preview)}
          onRemove={() => removeImageField(index)}
          showRemove={images.length > 1}
        />
      ))}

      {images.length < maxImages && (
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          className="w-full border-dashed h-12 rounded-2xl"
          onClick={addImageField}
        >
          <Plus size={18} className="mr-2" />
          เพิ่มรูปภาพประกอบ ({images.length}/{maxImages})
        </Button>
      )}
    </div>
  );
}
