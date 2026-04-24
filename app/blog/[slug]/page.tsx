import httpClient from "@/app/lib/api";
import { Blog, Comment } from "@/app/lib/types";
import { notFound } from "next/navigation";
import ArticleHeader from "@/app/components/blog/ArticleHeader";
import CommentSection from "@/app/components/blog/CommentSection";
import ImageGallery from "@/app/components/blog/ImageGallery";
import ServerToastHandler from "@/app/components/ui/ServerToastHandler";

import Breadcrumb from "@/app/components/ui/Breadcrumb";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let blog: Blog | null = null;
  let comments: Comment[] = [];
  let fetchError = "";

  try {
    // Axios call on Server Side
    blog = await httpClient.get<Blog>(`/blogs/${slug}`);

    if (blog) {
      comments = await httpClient.get<Comment[]>("/comments", {
        params: { blogId: blog.id },
      });
    }
  } catch (error: any) {
    console.error("Failed to fetch blog detail on server:", error);
    fetchError = error.message || "ไม่สามารถดึงข้อมูลบทความได้";
  }

  if (!blog) {
    if (fetchError) {
      return (
        <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
          <ServerToastHandler error={fetchError} />
          <h1 className="text-2xl font-bold text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</h1>
          <p className="text-zinc-500">กรุณาลองใหม่อีกครั้งในภายหลัง</p>
        </div>
      );
    }
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <ServerToastHandler error={fetchError} />
      
      <Breadcrumb 
        items={[
          { label: "Blogs", href: "/" },
          { label: blog.title }
        ]} 
      />

      <ArticleHeader
        title={blog.title}
        createdAt={blog.createdAt}
        viewCount={blog.viewCount}
      />

      {/* Unified Article Premium Card */}
      <div className="relative group">
        {/* Decorative Background Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />

        <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl rounded-[3.5rem] border border-white/20 dark:border-zinc-800 shadow-2xl overflow-hidden">

          {/* 1. Dynamic Image Gallery (Client Component) */}
          <ImageGallery images={blog.additionalImages || []} title={blog.title} />

          <div className="p-8 md:p-20 space-y-20">
            {/* 2. Elegant Summary Quote */}
            <div className="relative max-w-3xl mx-auto text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-12 h-[1px] bg-indigo-500/50" />
              </div>
              <blockquote className="text-3xl md:text-4xl font-serif italic text-zinc-800 dark:text-zinc-100 leading-tight tracking-tight">
                "{blog.summary}"
              </blockquote>
              <div className="flex justify-center">
                <div className="w-12 h-[1px] bg-indigo-500/50" />
              </div>
            </div>

            {/* 3. Main Content Body */}
            <div
              className="prose prose-zinc dark:prose-invert prose-lg md:prose-2xl max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter
              prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
              prose-img:rounded-[3rem] prose-img:shadow-2xl"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* 4. Comment Section (Now Inside) */}
            <CommentSection
              blogId={blog.id}
              comments={comments}
              allowComments={blog.allowComments}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
