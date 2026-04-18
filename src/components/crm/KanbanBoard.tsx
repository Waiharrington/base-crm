"use client";

import React, { useState } from "react";
import { Plus, MoreHorizontal, DollarSign, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CRM_CONFIG } from "@/lib/constants/config";
import { updateDealStage } from "@/app/actions/crm";

export function KanbanBoard({ initialDeals }: { initialDeals: any[] }) {
  const [deals, setDeals] = useState(initialDeals);
  const stages = CRM_CONFIG.pipeline;

  const handleStageChange = async (dealId: string, newStage: string) => {
    // Optimistic update
    const previousDeals = [...deals];
    setDeals(deals.map(d => d.id === dealId ? { ...d, stage: newStage } : d));

    try {
      await updateDealStage(dealId, newStage);
    } catch (error) {
      console.error("Failed to update deal stage:", error);
      setDeals(previousDeals);
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 -mx-8 px-8 h-[calc(100vh-200px)]">
      {stages.map((stage) => (
        <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
          {/* Stage Header */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", stage.color)} />
              <h3 className="text-sm font-black uppercase tracking-widest">{stage.name}</h3>
              <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                {deals.filter((d: any) => d.stage === stage.id).length}
              </span>
            </div>
            <button className="text-slate-400 hover:text-primary transition-colors">
              <Plus size={18} />
            </button>
          </div>

          {/* Cards Container */}
          <div className="flex-1 space-y-3 p-2 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800 overflow-y-auto">
            {deals
              .filter((deal: any) => deal.stage === stage.id)
              .map((deal: any) => (
                <KanbanCard key={deal.id} deal={deal} />
              ))}
            
            <button className="w-full py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-[10px] font-black uppercase text-slate-400 hover:border-primary hover:text-primary transition-all">
              + Add Deal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function KanbanCard({ deal }: any) {
  return (
    <div className="glass-card p-4 rounded-xl cursor-grab active:cursor-grabbing hover:border-primary transition-all group">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-bold group-hover:text-primary transition-colors leading-tight">{deal.title}</h4>
        <button className="text-slate-300 hover:text-slate-600">
          <MoreHorizontal size={14} />
        </button>
      </div>
      
      <p className="text-[10px] font-black uppercase text-slate-400 mb-4">{deal.customer}</p>
      
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-xs font-black">
          <DollarSign size={12} className="text-success" />
          {deal.value}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
          <Clock size={12} />
          2d left
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
         <div className={cn(
           "h-1.5 w-full rounded-full",
           deal.priority === 'high' ? 'bg-danger/20' : deal.priority === 'medium' ? 'bg-warning/20' : 'bg-primary/20'
         )}>
           <div className={cn(
             "h-full rounded-full",
             deal.priority === 'high' ? 'bg-danger w-3/4' : deal.priority === 'medium' ? 'bg-warning w-1/2' : 'bg-primary w-1/4'
           )} />
         </div>
      </div>
    </div>
  );
}
