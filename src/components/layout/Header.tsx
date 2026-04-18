"use client";

import React, { useEffect, useState } from "react";
import { Search, Bell, User, Sun, Moon } from "lucide-react";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 dark:bg-slate-800">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search leads, deals, tasks..." 
          className="bg-transparent text-sm outline-none w-full text-foreground"
        />
      </div>

      <div className="flex items-center gap-4">
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
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold">Admin User</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Super Admin</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}
