"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, LogIn, LogOut, Plus, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("ออกจากระบบเรียบร้อย");
    router.push("/");
    router.refresh();
  };

  return (
    <footer className="py-12 px-4 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
            MyBlog<span className="text-indigo-600">.</span>
          </Link>
          <p className="text-sm text-zinc-500 font-medium">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Subtle Admin Actions */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-500 transition-colors flex items-center gap-1"
            >
              <Shield size={10} />
              Admin Access
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
