"use client";

import React, { useEffect, useState } from "react";
import { Search, Bell, User, Sun, Moon, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-8 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 w-full">
      <div className="flex md:hidden mr-4">
        <span className="text-xl font-black tracking-tighter text-primary">BASE<span className="text-foreground">CRM</span></span>
      </div>

      <div className="hidden sm:flex w-full max-w-xs md:max-w-md items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 dark:bg-slate-800">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent text-sm outline-none w-full text-foreground"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger border-2 border-white dark:border-slate-900" />
        </button>
        
        <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-sm font-bold">Admin User</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Super Admin</span>
          </div>
          <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg text-xs md:text-sm">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}
