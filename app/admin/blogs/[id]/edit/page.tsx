"use client";

import { useEffect, useState, use } from "react";
import { fetchApi } from "@/app/lib/api";
import { Blog } from "@/app/lib/types";
import BlogForm from "../../_components/BlogForm";
import { Loader2 } from "lucide-react";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetchApi<Blog>(`/admin/blogs/${id}`);
        setBlog(res);
      } catch (error) {
        console.error("Failed to fetch blog for editing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (!blog) return <div className="text-center py-24">ไม่พบบทความ</div>;

  return <BlogForm initialData={blog} isEdit />;
}
