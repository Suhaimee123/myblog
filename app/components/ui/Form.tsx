"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FormProps {
  title?: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  headerAction?: ReactNode;
  className?: string;
}

export default function Form({ title, description, onSubmit, children, headerAction, className }: FormProps) {
  return (
    <div className={className}>
      <div className="space-y-10">
        {/* Header Section */}
        {(title || description || headerAction) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              {title && (
                <h3 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {description}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={onSubmit} className="space-y-6">
          {children}
        </form>
      </div>
    </div>
  );
}
