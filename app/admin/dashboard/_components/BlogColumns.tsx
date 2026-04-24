"use client";

import { ColumnDef } from "@/app/components/ui/DataTable";
import { Blog } from "@/app/lib/types";
import { Eye, Edit2, Trash2, ImageIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/app/lib/utils";

interface BlogColumnsProps {
  onDelete: (id: string) => void;
}

export const getBlogColumns = ({ onDelete }: BlogColumnsProps): ColumnDef<Blog>[] => [
  {
    header: "บทความ",
    className: "w-full sm:w-auto",
    cell: (blog) => (
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 border border-zinc-200 dark:border-zinc-800">
          {blog.additionalImages?.[0]?.url ? (
            <img
              src={blog.additionalImages[0].url}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              <ImageIcon size={16} />
            </div>
          )}
        </div>
        <div>
          <div className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{blog.title}</div>
          <div className="text-[10px] text-zinc-500 font-mono">ID: {blog.id}</div>
        </div>
      </div>
    ),
  },
  {
    header: "สถานะ",
    cell: (blog) => (
      <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${blog.published
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        }`}>
        {blog.published ? "Published" : "Draft"}
      </span>
    ),
  },
  {
    header: "คอมเมนต์",
    cell: (blog) => {
      const unapprovedCount = blog.comments?.filter(c => c.status === 'PENDING').length || 0;
      return (
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <div className="relative">
            <MessageSquare size={16} />
            {unapprovedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          <span className="font-bold">{blog.comments?.length || 0}</span>
        </div>
      );
    },
  },
  {
    header: "วันที่สร้าง",
    cell: (blog) => <span className="text-sm text-zinc-500">{formatDate(blog.createdAt)}</span>,
  },
  {
    header: "ยอดชม",
    cell: (blog) => (
      <div className="flex items-center gap-1 text-sm text-zinc-500">
        <Eye size={14} />
        {blog.viewCount}
      </div>
    ),
  },
  {
    header: "จัดการ",
    className: "text-right",
    cell: (blog) => (
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
          onClick={(e) => {
            e.stopPropagation(); // กันไม่ให้มันไปกด Expand แถว
            onDelete(blog.id);
          }}
          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
