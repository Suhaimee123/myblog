"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import httpClient from "@/app/lib/api";
import { Blog, ApiResponse } from "@/app/lib/types";
import { Plus, LayoutDashboard, Loader2 } from "lucide-react";
import CommentModerationList from "../blogs/_components/CommentModerationList";
import { getBlogColumns } from "./_components/BlogColumns";
import Link from "next/link";
import { toast } from "sonner";

import { DataTable } from "@/app/components/ui/DataTable";
import { ConfirmModal } from "@/app/components/ui/Modal";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [loading, setLoading] = useState(true);
  
  // States สำหรับ Modal
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchBlogs(1, meta.limit);
  }, [router]);

  const fetchBlogs = async (page: number = 1, limit: number = meta.limit) => {
    try {
      setLoading(true);
      const res = await httpClient.get<ApiResponse<Blog>>(`/admin/blogs?page=${page}&limit=${limit}`);
      setBlogs(res.data);
      if (res.meta) {
        setMeta(res.meta);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    fetchBlogs(1, newLimit);
  };

  const handleDelete = async (id: string) => {
    try {
      await httpClient.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("ลบบทความสำเร็จ");
      setDeleteBlogId(null);
    } catch (error: any) {
      toast.error(error.message || "ลบไม่สำเร็จ");
    }
  };

  const handleApproveComment = async (commentId: string, blogId: string) => {
    try {
      await httpClient.patch(`/admin/comments/${commentId}/approve`);
      // อัปเดต state ในหน้าบ้าน
      setBlogs(blogs.map(blog => {
        if (blog.id === blogId) {
          return {
            ...blog,
            comments: blog.comments?.map(c =>
              c.id === commentId ? { ...c, status: 'APPROVED' } : c
            )
          };
        }
        return blog;
      }));
      toast.success("อนุมัติคอมเมนต์สำเร็จ");
    } catch (error: any) {
      toast.error(error.message || "อนุมัติไม่สำเร็จ");
    }
  };

  const handleRejectComment = async (commentId: string, blogId: string) => {
    try {
      await httpClient.patch(`/admin/comments/${commentId}/reject`);
      // อัปเดต state ในหน้าบ้าน
      setBlogs(blogs.map(blog => {
        if (blog.id === blogId) {
          return {
            ...blog,
            comments: blog.comments?.map(c => 
              c.id === commentId ? { ...c, status: 'REJECTED' } : c
            )
          };
        }
        return blog;
      }));
      toast.success("ปฏิเสธคอมเมนต์สำเร็จ");
    } catch (error: any) {
      toast.error(error.message || "ปฏิเสธไม่สำเร็จ");
    }
  };

  const columns = getBlogColumns({ onDelete: (id) => setDeleteBlogId(id) });

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
          <p className="text-zinc-500">รวมบทความทั้งหมดของคุณ ({meta.total} รายการ)</p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all"
        >
          <Plus size={20} />
          เขียนบทความใหม่
        </Link>
      </div>

      <DataTable
        data={blogs}
        columns={columns}
        keyExtractor={(b) => b.id}
        emptyMessage="ยังไม่มีบทความ เริ่มต้นเขียนชิ้นแรกของคุณเลย!"
        meta={meta}
        onPageChange={(page) => fetchBlogs(page, meta.limit)}
        onLimitChange={handleLimitChange}
        expandableContent={(blog) => (
          <CommentModerationList
            comments={blog.comments || []}
            blogId={blog.id}
            onApprove={handleApproveComment}
            onReject={handleRejectComment}
          />
        )}
      />

      {/* Blog Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteBlogId}
        onClose={() => setDeleteBlogId(null)}
        onConfirm={() => deleteBlogId && handleDelete(deleteBlogId)}
        title="ยืนยันการลบบทความ"
        message="คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้? ข้อมูลทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้"
        confirmText="ลบบทความ"
      />
    </div>
  );
}
