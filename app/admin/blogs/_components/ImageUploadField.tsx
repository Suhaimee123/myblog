"use client";

import { useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadFieldProps {
  url?: string;
  preview?: string;
  isCover: boolean;
  onFileSelect: (file: File, preview: string) => void;
  onRemove: () => void;
  showRemove: boolean;
}

export default function ImageUploadField({ url, preview, isCover, onFileSelect, onRemove, showRemove }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // ใช้ preview URL ถ้ามีไฟล์ใหม่ ถ้าไม่มีใช้ url เดิมจากระบบ
  const displayUrl = preview || url;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ไฟล์ใหญ่เกินไป (จำกัด 5MB)");
      return;
    }

    // สร้าง Preview URL เพื่อให้ผู้ใช้เห็นรูปทันทีโดยไม่ต้องอัปโหลด
    const previewUrl = URL.createObjectURL(file);
    onFileSelect(file, previewUrl);
  };

  return (
    <div className="space-y-3 group">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          {isCover ? "🖼️ รูปหน้าปก (Cover)" : `📷 รูปประกอบ`}
        </label>
        {showRemove && (
          <button 
            type="button" 
            onClick={onRemove}
            className="text-red-500 hover:text-red-600 transition-colors p-1"
          >
            <X size={14} />
          </button>
        )}
      </div>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center
          ${displayUrl ? "border-transparent shadow-md" : "border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 bg-zinc-50/50 dark:bg-zinc-950/50"}
        `}
      >
        {displayUrl ? (
          <>
            <Image
              src={displayUrl}
              alt="Preview"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2 backdrop-blur-sm">
              <Upload size={16} />
              เปลี่ยนรูปภาพ
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload size={18} className="text-zinc-500" />
            </div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">คลิกเพื่อเลือกรูป</p>
          </>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
      </div>
    </div>
  );
}
