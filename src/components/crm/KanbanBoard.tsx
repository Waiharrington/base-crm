"use client";

import React, { useState } from "react";
import { Plus, MoreHorizontal, DollarSign, Clock, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { CRM_CONFIG } from "@/lib/constants/config";
import { updateDealStage } from "@/app/actions/crm";
import { CreateDealModal } from "./CreateDealModal";

export function KanbanBoard({ initialDeals, contacts }: { initialDeals: any[]; contacts: any[] }) {
  const [deals, setDeals] = useState(initialDeals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stages = CRM_CONFIG.pipeline;

  const handleStageChange = async (dealId: string, newStage: string) => {
    // Optimistic update
    const previousDeals = [...deals];
    setDeals(deals.map((d: any) => d.id === dealId ? { ...d, stage: newStage } : d));

    try {
      await updateDealStage(dealId, newStage);
    } catch (error) {
      console.error("Failed to update deal stage:", error);
      setDeals(previousDeals);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter">Negotiations</h1>
          <p className="hidden md:block text-slate-500 font-semibold">Track your sales pipeline and move deals to closing.</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold hover:bg-slate-50 transition-all dark:border-slate-800 whitespace-nowrap">
            <Filter size={14} /> Filters
          </button>
          <button className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold hover:bg-slate-50 transition-all dark:border-slate-800 whitespace-nowrap">
            <Download size={14} /> Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 md:px-6 py-2 text-xs font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all whitespace-nowrap ml-auto"
          >
            <Plus size={14} /> New Deal
          </button>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 -mx-4 px-4 md:-mx-8 md:px-8 h-[calc(100vh-280px)] md:h-[calc(100vh-250px)] no-scrollbar">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", stage.color)} />
                <h3 className="text-sm font-black uppercase tracking-widest">{stage.name}</h3>
                <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  {deals.filter((d: any) => d.stage === stage.id).length}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 p-2 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800 overflow-y-auto">
              {deals
                .filter((deal: any) => deal.stage === stage.id)
                .map((deal: any) => (
                  <KanbanCard key={deal.id} deal={deal} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <CreateDealModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        contacts={contacts}
      />
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
      
      <p className="text-[10px] font-black uppercase text-slate-400 mb-4">{deal.contacts?.first_name} {deal.contacts?.last_name}</p>
      
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-xs font-black">
          <DollarSign size={12} className="text-success" />
          {deal.value?.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
          <Clock size={12} />
          {new Date(deal.created_at).toLocaleDateString()}
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
