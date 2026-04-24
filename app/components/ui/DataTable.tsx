import React, { ReactNode, useState } from "react";
import Button from "./Button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";

export interface ColumnDef<T> {
  header: ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  meta?: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  expandableContent?: (item: T) => ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "ไม่มีข้อมูล",
  meta,
  onPageChange,
  onLimitChange,
  expandableContent,
}: DataTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
              {expandableContent && <th className="w-10"></th>}
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 font-bold text-sm ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {data.map((item) => {
              const id = keyExtractor(item);
              const isExpanded = expandedRows.has(id);

              return (
                <React.Fragment key={id}>
                  <tr 
                    className={cn(
                      "hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors cursor-pointer",
                      isExpanded && "bg-zinc-50/30 dark:bg-zinc-800/10"
                    )}
                    onClick={() => expandableContent && toggleRow(id)}
                  >
                    {expandableContent && (
                      <td className="pl-6 py-4">
                        <ChevronDown 
                          size={16} 
                          className={cn("text-zinc-400 transition-transform", isExpanded && "rotate-180")} 
                        />
                      </td>
                    )}
                    {columns.map((col, idx) => (
                      <td key={idx} className={`px-6 py-4 ${col.className || ""}`}>
                        {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : null)}
                      </td>
                    ))}
                  </tr>
                  {isExpanded && expandableContent && (
                    <tr className="bg-zinc-50/30 dark:bg-zinc-800/10">
                      <td colSpan={columns.length + 1} className="px-6 py-4">
                        <div className="animate-in slide-in-from-top-2 duration-200">
                          {expandableContent(item)}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-24">
          <p className="text-zinc-500">{emptyMessage}</p>
        </div>
      )}

      {data.length > 0 && meta && (
        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <p>
              แสดงหน้าที่ {meta.page} จากทั้งหมด {meta.totalPages} หน้า
            </p>
            {onLimitChange && (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">แสดง</span>
                <select 
                  className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                  value={meta.limit}
                  onChange={(e) => onLimitChange(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>แถว</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onPageChange?.(meta.page - 1)}
              disabled={meta.page <= 1}
            >
              หน้าก่อนหน้า
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onPageChange?.(meta.page + 1)}
              disabled={meta.page >= meta.totalPages}
            >
              หน้าถัดไป
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
