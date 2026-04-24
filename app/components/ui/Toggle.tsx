"use client";

import { cn } from "@/app/lib/utils";

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export default function Toggle({ label, description, checked, onChange, icon }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-3">
        {icon && <div className="text-zinc-400">{icon}</div>}
        <div>
          <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{label}</div>
          {description && <div className="text-xs text-zinc-500">{description}</div>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none",
          checked ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-800"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
