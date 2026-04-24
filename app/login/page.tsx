"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import httpClient from "@/app/lib/api";
import { motion } from "framer-motion";
import { Lock, User, Loader2, Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Form from "@/app/components/ui/Form";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await httpClient.post<{ access_token: string }>("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.access_token);
      toast.success("เข้าสู่ระบบสำเร็จ");
      router.push("/admin/dashboard");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/20 dark:border-zinc-800 shadow-2xl">
          <Form 
            title="ยินดีต้อนรับ"
            description="เข้าสู่ระบบเพื่อจัดการเนื้อหาบล็อกของคุณ"
            onSubmit={handleLogin}
            headerAction={
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Sparkles size={24} />
              </div>
            }
          >
            <div className="space-y-6">
              {/* Username Field */}
              <Input
                label="ชื่อผู้ใช้งาน"
                placeholder="ระบุชื่อผู้ใช้งาน"
                icon={<User size={18} />}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              {/* Password Field */}
              <Input
                label="รหัสผ่าน"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock size={18} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={loading}
                size="md"
                className="w-full py-4 rounded-2xl"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    เข้าสู่ระบบ
                    <Sparkles size={18} />
                  </>
                )}
              </Button>
            </div>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}
