"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface ServerToastHandlerProps {
  error?: string;
  success?: string;
}

export default function ServerToastHandler({ error, success }: ServerToastHandlerProps) {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  }, [error, success]);

  return null; // Component นี้ไม่มี UI ของตัวเอง
}
