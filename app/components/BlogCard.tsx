"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Eye, ArrowRight, Sparkles } from "lucide-react";
import { formatDate } from "@/app/lib/utils";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    createdAt: string;
    viewCount: number;
    additionalImages?: { url: string }[];
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const coverImage = blog.additionalImages?.[0]?.url || "/placeholder-blog.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="group relative flex flex-col h-[480px] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-zinc-800/50 shadow-lg hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] transition-all duration-500"
    >
      {/* Click Area */}
      <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-20" aria-label={blog.title} />
      
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={coverImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Floating Badges on Image */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
            <Calendar size={10} className="text-indigo-400" />
            {formatDate(blog.createdAt)}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow relative">
        {/* Decorative Element */}
        <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
          <Sparkles size={20} />
        </div>

        <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter mb-4">
          <span className="flex items-center gap-1.5">
            <Eye size={12} className="text-indigo-500" />
            {blog.viewCount.toLocaleString()} VIEWS
          </span>
          <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
          <span>ARTICLE</span>
        </div>

        <h3 className="text-2xl font-black mb-3 text-zinc-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow font-medium">
          {blog.summary}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest">
            <span>Read Story</span>
            <div className="w-8 h-[2px] bg-indigo-600/20 dark:bg-indigo-400/20 group-hover:w-12 transition-all duration-500" />
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 border-2 border-indigo-500/0 group-hover:border-indigo-500/20 rounded-[2.5rem] transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}
