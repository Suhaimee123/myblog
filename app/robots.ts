import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login'], // ห้าม Bot เข้าหน้าจัดการและหน้าล็อกอิน
    },
    sitemap: 'https://your-blog-url.com/sitemap.xml',
  };
}
