"use client";

import { MessageSquare, User, Check, Ban } from "lucide-react";
import { Comment } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";

interface CommentModerationListProps {
  comments: Comment[];
  blogId: string;
  onApprove: (commentId: string, blogId: string) => void;
  onReject: (commentId: string, blogId: string) => void;
}

export default function CommentModerationList({
  comments,
  blogId,
  onApprove,
  onReject,
}: CommentModerationListProps) {
  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm flex items-center gap-2 text-zinc-900 dark:text-white">
          <MessageSquare size={16} className="text-indigo-500" />
          ความคิดเห็นทั้งหมด ({comments.length})
        </h4>
      </div>
      
      <div className="grid gap-3">
        {comments.length === 0 ? (
          <div className="text-xs text-zinc-500 py-4 italic">ยังไม่มีความคิดเห็นในบทความนี้</div>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment.id} 
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-start justify-between gap-4 shadow-sm"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <User size={14} className="text-zinc-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{comment.name}</span>
                    <span className="text-[10px] text-zinc-500">{formatDate(comment.createdAt)}</span>
                    {comment.status === 'APPROVED' && (
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[8px] font-bold uppercase rounded-md">
                        Approved
                      </span>
                    )}
                    {comment.status === 'REJECTED' && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[8px] font-bold uppercase rounded-md">
                        Rejected
                      </span>
                    )}
                    {comment.status === 'PENDING' && (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[8px] font-bold uppercase rounded-md animate-pulse">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {comment.message}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {comment.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => onApprove(comment.id, blogId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-xl transition-all text-xs font-bold"
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(comment.id, blogId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 rounded-xl transition-all text-xs font-bold"
                    >
                      <Ban size={14} />
                      Reject
                    </button>
                  </>
                )}
                
                {comment.status === 'APPROVED' && (
                  <button
                    onClick={() => onReject(comment.id, blogId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 rounded-xl transition-all text-xs font-bold"
                  >
                    <Ban size={14} />
                    Reject
                  </button>
                )}

                {comment.status === 'REJECTED' && (
                  <button
                    onClick={() => onApprove(comment.id, blogId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-xl transition-all text-xs font-bold"
                  >
                    <Check size={14} />
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
