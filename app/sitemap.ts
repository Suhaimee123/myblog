import { MetadataRoute } from 'next';
import httpClient from '@/app/lib/api';
import { Blog, ApiResponse } from '@/app/lib/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-blog-url.com';

  // 1. ดึงข้อมูลบทความทั้งหมด
  let blogs: Blog[] = [];
  try {
    const res = await httpClient.get<ApiResponse<Blog>>('/blogs?limit=100');
    blogs = res.data;
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap');
  }

  // 2. สร้างแผนผังหน้าบทความ
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. รวมกับหน้าหลัก
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...blogUrls,
  ];
}
