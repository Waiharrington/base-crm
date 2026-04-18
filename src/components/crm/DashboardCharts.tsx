"use client";

import React from "react";
import { motion } from "framer-motion";

export function DashboardCharts() {
  const data = {
    distribution: [
      { name: "Consulting", value: 45, color: "bg-primary" },
      { name: "Services", value: 30, color: "bg-accent" },
      { name: "Support", value: 15, color: "bg-success" },
      { name: "Others", value: 10, color: "bg-slate-300" },
    ],
    weekly: [40, 65, 50, 85, 70, 95, 80]
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-2">
      {/* Composition Chart */}
      <div className="glass-card p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-black tracking-tighter">Composition</h4>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Revenue Distribution</p>
          </div>
        </div>

        <div className="relative flex h-64 items-center justify-center">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-8 border-slate-50 dark:border-slate-800 shadow-inner">
             {/* Progress circles simplified for template */}
             <div className="flex flex-col items-center">
                <span className="text-4xl font-black tracking-tighter text-primary">75%</span>
                <span className="text-[10px] font-black uppercase text-slate-400">Core Services</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {data.distribution.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className={cn("h-3 w-3 rounded-full", item.color)} />
              <span className="text-[10px] font-black uppercase text-slate-500">{item.name} ({item.value}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Chart */}
      <div className="glass-card p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-black tracking-tighter">Evolution</h4>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">New Leads (Weekly)</p>
          </div>
        </div>

        <div className="flex h-64 items-end justify-between gap-2 px-2">
          {data.weekly.map((value, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-3">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className={cn(
                  "w-full rounded-t-xl transition-all hover:opacity-80",
                  i === 5 ? "bg-primary shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-slate-800"
                )}
              />
              <span className="text-[9px] font-black text-slate-400">{["M", "T", "W", "T", "F", "S", "D"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
