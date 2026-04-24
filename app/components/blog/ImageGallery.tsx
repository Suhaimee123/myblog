"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: { url: string }[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-8 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-black/10">
      
      {/* 1. Desktop Only: Featured Image */}
      <motion.div
        whileHover={{ scale: 1.01, y: -5 }}
        className="hidden md:block relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] group/img cursor-zoom-in"
      >
        <Image
          src={images[0].url}
          alt={title}
          fill
          className="object-cover group-hover/img:scale-105 transition-transform duration-1000 ease-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </motion.div>

      {/* 2. Slider Section */}
      {/* On Mobile: Shows ALL images (1-10) in a single row slider */}
      {/* On Desktop: Shows remaining images (2-10) below the featured image */}
      <div className="relative group/slider">
        
        {/* Desktop Arrows */}
        <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 translate-x-4 group-hover/slider:translate-x-0">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-xl border border-zinc-200 dark:border-zinc-700 hover:bg-indigo-600 hover:text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 -translate-x-4 group-hover/slider:translate-x-0">
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-xl border border-zinc-200 dark:border-zinc-700 hover:bg-indigo-600 hover:text-white transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-4 md:pb-6 px-1 md:px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {/* บนมือถือเราจะ Map ทุกรูป (images) แต่บน Desktop เราจะข้ามรูปแรก (slice(1)) */}
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              // จัดการเงื่อนไขการซ่อนรูปแรกใน Slider เฉพาะบน Desktop
              className={`relative flex-none rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl snap-center group/subimg cursor-pointer
                ${index === 0 ? "md:hidden w-[88vw] aspect-[16/10]" : "w-[88vw] md:w-[450px] aspect-[16/10]"}
              `}
            >
              <Image
                src={img.url}
                alt={`${title}-${index}`}
                fill
                className="object-cover group-hover/subimg:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Status Badge */}
              <div className="absolute bottom-4 right-4 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white/70 opacity-100 md:opacity-0 group-hover/subimg:opacity-100 transition-opacity uppercase tracking-widest">
                {index + 1} / {images.length}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Gradient Shadow */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full bg-gradient-to-l from-zinc-50/50 dark:from-black/40 to-transparent pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
