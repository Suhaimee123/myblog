"use client";

import { Comment } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";
import { MessageSquare, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import CommentForm from "./CommentForm";

interface CommentSectionProps {
  blogId: string;
  comments: Comment[];
  allowComments: boolean;
}

export default function CommentSection({ blogId, comments, allowComments }: CommentSectionProps) {
  return (
    <section className="pt-20 border-t border-zinc-200/50 dark:border-zinc-800/50 space-y-12">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/10">
            <MessageSquare size={20} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              ความคิดเห็น
            </h2>
            <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
              {comments.length} Conversations
            </p>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="grid gap-8">
        {comments.map((comment, idx) => (
          <motion.div 
            key={comment.id} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-8 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-zinc-200 dark:border-zinc-800/60 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-500">
                  <User size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl text-zinc-900 dark:text-white">{comment.name}</span>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{formatDate(comment.createdAt)}</span>
                </div>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium pl-1">
              {comment.message}
            </p>
          </motion.div>
        ))}
        
        {comments.length === 0 && (
          <div className="relative group overflow-hidden py-24 px-8 text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-[3rem] border border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/10 border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={32} className="text-indigo-500" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black text-zinc-900 dark:text-white">เงียบเหงาจังเลย...</p>
                <p className="text-zinc-500 font-medium max-w-xs mx-auto">ยังไม่มีใครคอมเมนต์เลย มาเริ่มต้นบทสนทนาเป็นคนแรกกันเถอะ!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form Section */}
      {allowComments && (
        <div className="pt-8">
          <CommentForm blogId={blogId} />
        </div>
      )}
    </section>
  );
}
