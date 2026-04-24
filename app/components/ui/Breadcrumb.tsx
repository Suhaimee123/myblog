"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 md:pb-0">
      <Link 
        href="/" 
        className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
      >
        <Home size={14} />
        Home
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={12} className="text-zinc-300" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 dark:text-zinc-100 line-clamp-1 max-w-[200px]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
