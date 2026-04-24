"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import httpClient from "@/app/lib/api";
import { Blog } from "@/app/lib/types";
import { Save, Loader2, Image as ImageIcon, Globe, Lock, Type, Link as LinkIcon, AlignLeft } from "lucide-react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import Toggle from "@/app/components/ui/Toggle";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isEdit ? `/admin/blogs/${initialData?.id}` : "/admin/blogs";
      
      if (isEdit) {
        await httpClient.patch(endpoint, formData);
        toast.success("แก้ไขบทความสำเร็จ");
      } else {
        await httpClient.post(endpoint, formData);
        toast.success("สร้างบทความใหม่สำเร็จ");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "บันทึกไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-10">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-4xl font-black tracking-tight">
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
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-8">
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
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-8">
            <h3 className="text-lg font-black flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
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

              <Toggle
                label="อนุญาตให้คอมเมนต์"
                description="ให้ผู้อื่นสามารถแสดงความคิดเห็นได้"
                checked={formData.allowComments}
                onChange={(val) => setFormData({ ...formData, allowComments: val })}
                icon={<Lock size={20} />}
              />
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <ImageIcon size={20} className="text-indigo-500" />
              รูปหน้าปก
            </h3>
            <div className="aspect-video bg-zinc-50 dark:bg-zinc-950 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 group hover:border-indigo-500 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon size={24} className="text-zinc-500" />
              </div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
