"use client";

import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div 
      className={cn(
        "p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl", 
        className
      )}
    >
      {children}
    </div>
  );
}
