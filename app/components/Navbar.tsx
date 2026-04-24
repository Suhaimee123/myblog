"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Terminal, PenTool, LayoutDashboard, LogIn, LogOut, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const navItems = [
  { name: "หน้าแรก", href: "/", icon: Terminal },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    // Listen for storage changes (in case of login/logout in other tabs)
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl shadow-indigo-500/10"
      >
        <Link href="/" className="flex items-center gap-2 mr-4 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
            B
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">MyBlog</span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive 
                    ? "text-indigo-600 dark:text-indigo-400" 
                    : "text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-indigo-500/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={18} />
                <span className="hidden xs:block">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="h-6 w-[1px] bg-white/20 mx-2" />

        <AnimatePresence>
          {isLoggedIn ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1"
            >
              <Link
                href="/admin/dashboard"
                className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-white/5 transition-all"
                title="แผงควบคุม"
              >
                <LayoutDashboard size={20} />
              </Link>
              <Link
                href="/admin/blogs/new"
                className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-white/5 transition-all"
                title="เขียนบทความ"
              >
                <Plus size={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 transition-all"
                title="ออกจากระบบ"
              >
                <LogOut size={20} />
              </button>
            </motion.div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
