"use client";

import { Search } from "lucide-react";
import Input from "@/app/components/ui/Input";

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue }: SearchBarProps) {
  return (
    <form action="/" className="max-w-xl mx-auto relative group">
      <Input
        name="search"
        defaultValue={defaultValue}
        placeholder="ค้นหาบทความ..."
        icon={<Search size={20} />}
        className="rounded-2xl py-4 shadow-xl shadow-indigo-500/5"
      />
    </form>
  );
}
