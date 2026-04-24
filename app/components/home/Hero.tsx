"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-center space-y-4 py-8">
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
      >
        ยินดีต้อนรับสู่ MyBlog
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
      >
        พื้นที่แบ่งปันประสบการณ์ ความรู้ และแรงบันดาลใจ เกี่ยวกับการเขียนโปรแกรม และเทคโนโลยีใหม่ๆ
      </motion.p>
    </section>
  );
}
