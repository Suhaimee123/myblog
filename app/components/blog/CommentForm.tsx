"use client";

import { useState, useEffect } from "react";
import httpClient from "@/app/lib/api";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import { Send, Loader2, CheckCircle2, User as UserIcon, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import Form from "@/app/components/ui/Form";

interface CommentFormProps {
  blogId: string;
  onSuccess?: () => void;
}

export default function CommentForm({ blogId, onSuccess }: CommentFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const prefixes = ["ยอด", "เซียน", "เทพ", "นินจา", "กูรู", "สหาย", "ปราชญ์", "จอม", "แมว", "นักล่า"];
  const nouns = ["นักเขียน", "คีย์บอร์ด", "คอกาแฟ", "แมวส้ม", "นักโค้ด", "นักอ่าน", "รัตติกาล", "สุรา"];

  const generateRandomName = () => {
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const n = nouns[Math.floor(Math.random() * nouns.length)];
    return `${p}${n} #${Math.floor(Math.random() * 9000) + 1000}`;
  };

  useEffect(() => {
    const savedName = localStorage.getItem("commenter_name");
    if (savedName) setName(savedName);
    else {
      const newName = generateRandomName();
      setName(newName);
      localStorage.setItem("commenter_name", newName);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await httpClient.post("/comments", { name, message, blogId });
      setSubmitted(true);
      setMessage("");
      toast.success("ส่งความคิดเห็นสำเร็จ!");
      if (onSuccess) onSuccess();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      toast.error(err.message || "ไม่สามารถส่งความคิดเห็นได้");
    } finally {
      setLoading(false);
    }
  };

  const identityHeader = (
    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 group focus-within:border-indigo-500/50 transition-colors">
      <UserIcon size={16} className="text-indigo-500 shrink-0" />
      <input 
        type="text"
        value={name}
        onChange={(e) => {
          const n = e.target.value;
          setName(n);
          localStorage.setItem("commenter_name", n);
        }}
        placeholder="ระบุชื่อของคุณ..."
        className="text-sm font-bold text-zinc-600 dark:text-zinc-300 bg-transparent border-none p-0 focus:ring-0 w-full min-w-[80px] max-w-[150px]"
      />
      <button 
        type="button"
        onClick={() => {
          const n = generateRandomName();
          setName(n);
          localStorage.setItem("commenter_name", n);
        }}
        className="p-1 hover:rotate-180 transition-transform duration-500 text-zinc-400 hover:text-indigo-500 shrink-0"
      >
        <RefreshCw size={14} />
      </button>
    </div>
  );

  return (
    <div className="relative p-1 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 rounded-[2.5rem]">
      <div className="p-8 md:p-12 bg-white/5 dark:bg-zinc-900/80 backdrop-blur-3xl rounded-[2.4rem] border border-white/10 shadow-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-10 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black">ส่งความคิดเห็นสำเร็จ!</h3>
                <p className="text-zinc-400 font-medium">ขอบคุณที่ร่วมแบ่งปันมุมมองกับเรา</p>
              </div>
              <Button variant="ghost" onClick={() => setSubmitted(false)}>เขียนเพิ่มเติม</Button>
            </motion.div>
          ) : (
            <Form
              title="ร่วมแสดงความคิดเห็น"
              description="แชร์มุมมองของคุณต่อบทความนี้"
              onSubmit={handleSubmit}
              headerAction={identityHeader}
            >
              <Textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="เขียนความคิดเห็นของคุณที่นี่..."
                className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 text-lg"
              />

              <Button
                type="submit"
                disabled={loading || !message.trim()}
                className="w-full md:w-auto min-w-[200px] h-14 rounded-2xl shadow-xl shadow-indigo-600/20"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> ส่งความคิดเห็น</>}
              </Button>
            </Form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
