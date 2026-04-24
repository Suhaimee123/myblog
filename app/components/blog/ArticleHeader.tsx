import { Calendar, Eye, User } from "lucide-react";
import { formatDate } from "@/app/lib/utils";

interface ArticleHeaderProps {
  title: string;
  createdAt: string;
  viewCount: number;
}

export default function ArticleHeader({ title, createdAt, viewCount }: ArticleHeaderProps) {
  return (
    <header className="space-y-6 text-center">
      <h1 className="text-3xl md:text-6xl font-black leading-tight tracking-tight">
        {title}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-zinc-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-indigo-500" />
          {formatDate(createdAt)}
        </div>
        <div className="flex items-center gap-2">
          <Eye size={18} className="text-indigo-500" />
          {viewCount} views
        </div>
      </div>
    </header>
  );
}
