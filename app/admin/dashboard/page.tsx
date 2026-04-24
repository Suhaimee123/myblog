"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import httpClient from "@/app/lib/api";
import { Blog, ApiResponse } from "@/app/lib/types";
import { Plus, Edit2, Trash2, Eye, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/app/lib/utils";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const res = await httpClient.get<ApiResponse<Blog>>("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?")) return;
    
    try {
      await httpClient.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("ลบบทความสำเร็จ");
    } catch (error: any) {
      toast.error(error.message || "ลบไม่สำเร็จ");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LayoutDashboard className="text-indigo-600" size={32} />
            จัดการบทความ
          </h1>
          <p className="text-zinc-500">รวมบทความทั้งหมดของคุณ ({blogs.length} รายการ)</p>
        </div>
        
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all"
        >
          <Plus size={20} />
          เขียนบทความใหม่
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 font-bold text-sm">บทความ</th>
                <th className="px-6 py-4 font-bold text-sm">สถานะ</th>
                <th className="px-6 py-4 font-bold text-sm">วันที่สร้าง</th>
                <th className="px-6 py-4 font-bold text-sm">ยอดชม</th>
                <th className="px-6 py-4 font-bold text-sm text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100">{blog.title}</div>
                    <div className="text-xs text-zinc-500 truncate max-w-xs">{blog.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      blog.published 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      {blog.viewCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-2 text-zinc-400 hover:text-indigo-600 transition-colors"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link 
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="p-2 text-zinc-400 hover:text-amber-600 transition-colors"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {blogs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-zinc-500">ยังไม่มีบทความ เริ่มต้นเขียนชิ้นแรกของคุณเลย!</p>
          </div>
        )}
      </div>
    </div>
  );
}
