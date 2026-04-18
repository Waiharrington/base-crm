"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Calendar, 
  CheckSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Briefcase, label: "Deals", href: "/deals" },
  { icon: Users, label: "Contacts", href: "/contacts" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "relative flex flex-col border-r bg-sidebar h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center px-6 border-b">
        {!isCollapsed && <span className="text-xl font-black tracking-tighter text-primary">BASE<span className="text-foreground">CRM</span></span>}
        {isCollapsed && <span className="text-xl font-black text-primary">B</span>}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-sidebar-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "" : "text-slate-400 group-hover:text-primary")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-sidebar-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          )}
        >
          <Settings className="h-5 w-5 text-slate-400" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-sm hover:bg-slate-50 dark:bg-slate-900"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
