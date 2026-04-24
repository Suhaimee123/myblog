"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import httpClient from "@/app/lib/api";
import { Blog } from "@/app/lib/types";
import { Save, Loader2, Image as ImageIcon, Globe, Lock, Type, Link as LinkIcon, AlignLeft, Plus } from "lucide-react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import Toggle from "@/app/components/ui/Toggle";
import Card from "@/app/components/ui/Card";
import { toast } from "sonner";
import ImageGalleryManager, { ImageState } from "./ImageGalleryManager";
import { getUniqueId, uploadFileToFolder, deleteFileFromStorage } from "@/app/lib/blog-utils";

interface BlogFormProps {
  initialData?: Blog;
  isEdit?: boolean;
}



export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    published: initialData?.published ?? false,
    allowComments: initialData?.allowComments ?? true,
  });

  // เก็บสถานะรูปภาพแยกออกมา
  const [images, setImages] = useState<ImageState[]>(
    initialData?.additionalImages?.map(img => ({ url: img.url })) || [{}]
  );
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("กำลังตรวจสอบข้อมูลและอัปโหลด...");

    try {
      // 1. จัดการเรื่อง ID สำหรับบทความใหม่
      let blogId = initialData?.id || "";
      if (!isEdit) {
        blogId = await getUniqueId();
      }

      // 2. อัปโหลดรูปภาพใหม่โดยใช้ blogId เป็นชื่อโฟลเดอร์
      const finalImageUrls = await Promise.all(
        images.map(async (img) => {
          if (img.file) {
            return await uploadFileToFolder(img.file, blogId);
          }
          return img.url;
        })
      );

      const validImages = finalImageUrls
        .filter((url): url is string => !!url);

      const submissionData = {
        ...formData,
        id: blogId, // ใส่ ID 4 หลักที่สุ่มมา
        additionalImages: validImages // ส่งเป็น Array ของ string ตรงๆ
      };

      const endpoint = isEdit ? `/admin/blogs/${initialData?.id}` : "/admin/blogs";
      
      if (isEdit) {
        await httpClient.patch(endpoint, submissionData);
        
        // ลบรูปภาพที่ถูกคัดออกจริงๆ จาก Storage
        if (removedImages.length > 0) {
          await Promise.all(removedImages.map(url => deleteFileFromStorage(url)));
          setRemovedImages([]); // ล้างคิวหลังลบสำเร็จ
        }
        
        toast.success("แก้ไขบทความสำเร็จ", { id: toastId });
      } else {
        await httpClient.post(endpoint, submissionData);
        toast.success(`สร้างบทความใหม่สำเร็จ (ID: ${blogId})`, { id: toastId });
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "บันทึกไม่สำเร็จ", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          {isEdit ? "แก้ไขบทความ" : "เขียนบทความใหม่"}
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard">
            <Button type="button" variant="ghost">ยกเลิก</Button>
          </Link>
          <Button type="submit" disabled={loading} className="min-w-[120px]">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            บันทึก
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="space-y-8">
            <Input
              label="หัวข้อบทความ"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              icon={<Type size={20} />}
              placeholder="ระบุหัวข้อบทความ..."
              className="text-xl font-black"
            />

            <Input
              label="Slug (URL)"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              icon={<LinkIcon size={20} />}
              placeholder="my-awesome-post"
              className="font-mono text-sm"
            />

            <Textarea
              label="คำโปรย (Summary)"
              required
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="อธิบายสั้นๆ เกี่ยวกับบทความนี้..."
              className="leading-relaxed"
            />

            <Textarea
              label="เนื้อหา (Content)"
              required
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="เขียนเนื้อหาของคุณที่นี่ (รองรับ HTML/Markdown)..."
              className="font-mono text-sm bg-zinc-50 dark:bg-zinc-950"
            />
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="space-y-8">
            <h3 className="text-lg font-black flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-white">
              <AlignLeft size={20} className="text-indigo-500" />
              การตั้งค่า
            </h3>
            <div className="space-y-6">
              <Toggle
                label="เผยแพร่สู่สาธารณะ"
                description="แสดงบทความนี้ในหน้าหลัก"
                checked={formData.published}
                onChange={(val) => setFormData({ ...formData, published: val })}
                icon={<Globe size={20} />}
              />
            </div>
          </Card>

          <Card className="space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2 text-zinc-900 dark:text-white">
              <ImageIcon size={20} className="text-indigo-500" />
              จัดการรูปภาพ
            </h3>
            
            <ImageGalleryManager 
              images={images} 
              setImages={setImages} 
              maxImages={10} 
              onRemoveExistingImage={(url) => setRemovedImages(prev => [...prev, url])}
            />
          </Card>
        </div>
      </div>
    </form>
  );
}
