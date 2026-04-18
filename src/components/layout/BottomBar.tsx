"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  CheckSquare, 
  MoreHorizontal,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function BottomBar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Inicio", href: "/" },
    { icon: Briefcase, label: "Tratos", href: "/deals" },
    { icon: Users, label: "Clientes", href: "/contacts" },
    { icon: CheckSquare, label: "Tareas", href: "/tasks" },
  ];

  const moreItems = [
    { icon: Calendar, label: "Agenda", href: "/calendar" },
    { icon: BarChart3, label: "Reportes", href: "/analytics" },
    { icon: Settings, label: "Configuración", href: "/settings" },
  ];

  return (
    <>
      {/* More Menu Overlay */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMoreOpen(false)} />
          
          <div className="glass-card relative w-full rounded-t-[32px] p-6 pb-24 animate-in slide-in-from-bottom duration-300">
            <div className="mx-auto w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mb-8" />
            
            <div className="space-y-4">
              {moreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-all">
                    <item.icon size={20} />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-danger/10 text-danger transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-danger/10 flex items-center justify-center">
                  <LogOut size={20} />
                </div>
                <span className="font-bold">Salir</span>
              </button>
            </div>

            <button 
              onClick={() => setIsMoreOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Bar Stick */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 pb-safe-offset-2">
        <div className="flex items-center justify-between h-20">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 flex-1 py-1 transition-all",
                  isActive ? "text-primary scale-110" : "text-slate-400"
                )}
              >
                <item.icon size={22} className={cn(isActive && "drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]")} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={() => setIsMoreOpen(true)}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-1 transition-all",
              isMoreOpen ? "text-primary" : "text-slate-400"
            )}
          >
            <MoreHorizontal size={22} />
            <span className="text-[10px] font-black uppercase tracking-widest">Más</span>
          </button>
        </div>
      </nav>
    </>
  );
}
