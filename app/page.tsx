import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyBlog | พื้นที่แบ่งปันความรู้ด้านการเขียนโปรแกรมและเทคโนโลยี",
  description: "บล็อกส่วนตัวที่รวบรวมบทความเกี่ยวกับ Next.js, NestJS, Tailwind CSS และเทคนิคการพัฒนาซอฟต์แวร์ยุคใหม่",
  keywords: ["โปรแกรมมิ่ง", "Next.js", "NestJS", "Tailwind CSS", "สอนเขียนเว็บ", "MyBlog"],
  openGraph: {
    title: "MyBlog | พื้นที่แบ่งปันความรู้",
    description: "รวมบทความเทคโนโลยีและประสบการณ์การเขียนโปรแกรม",
    type: "website",
    url: "https://your-blog-url.com",
    siteName: "MyBlog",
  },
};

import httpClient from "@/app/lib/api";
import { Blog, ApiResponse } from "@/app/lib/types";
import BlogCard from "@/app/components/BlogCard";
import Hero from "@/app/components/home/Hero";
import SearchBar from "@/app/components/home/SearchBar";
import ServerToastHandler from "@/app/components/ui/ServerToastHandler";

export default async function Home({
  searchParams: searchParamsProp,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const searchParams = await searchParamsProp;
  const search = searchParams?.search || "";
  
  let blogs: ApiResponse<Blog> = { 
    data: [], 
    meta: { total: 0, page: 1, limit: 10, totalPages: 0 } 
  };
  let fetchError = "";
  
  try {
    blogs = await httpClient.get<ApiResponse<Blog>>("/blogs", {
      params: { search },
    });
  } catch (error: any) {
    console.error("Failed to fetch blogs on server:", error);
    fetchError = error.message || "ไม่สามารถดึงข้อมูลบล็อกได้";
  }

  return (
    <div className="space-y-16">
      <ServerToastHandler error={fetchError} />
      <Hero />
      <SearchBar defaultValue={search} />

      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h2 className="text-3xl font-black tracking-tight">บทความล่าสุด</h2>
          <div className="px-4 py-1 bg-indigo-500/10 text-indigo-600 rounded-full text-sm font-bold">
            {blogs.meta.total} บทความ
          </div>
        </div>

        {blogs.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 shadow-inner">
            <p className="text-zinc-500 text-lg font-medium">ไม่พบบทความที่ต้องการ</p>
          </div>
        )}
      </section>
    </div>
  );
}
