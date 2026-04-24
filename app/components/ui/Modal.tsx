"use client";

import { ReactNode, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer 
}: ModalProps) {
  // ป้องกันการ Scroll พื้นหลังเมื่อ Modal เปิด
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="p-8 pb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 pt-4 text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
        
        {footer && (
          <div className="p-8 pt-6 flex items-center justify-end gap-3 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "primary";
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "ยืนยัน", 
  cancelText = "ยกเลิก",
  isLoading = false,
  variant = "danger"
}: ConfirmModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button 
            variant={variant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        {variant === "danger" && (
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        )}
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400 pt-2">
          {message}
        </p>
      </div>
    </Modal>
  );
}
