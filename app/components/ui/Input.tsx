"use client";

import { cn } from "@/app/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, suffix, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors z-10">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "relative w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm",
              icon ? "pl-12" : "pl-4",
              suffix ? "pr-12" : "pr-4",
              error ? "border-red-500 focus:ring-red-500/50" : "",
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-500 transition-colors z-10">
              {suffix}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
