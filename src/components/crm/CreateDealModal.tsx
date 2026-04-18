"use client";

import React, { useState } from "react";
import { X, Briefcase, DollarSign, Loader2, User } from "lucide-react";
import { createDeal } from "@/app/actions/crm";
import { CRM_CONFIG } from "@/lib/constants/config";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contacts: any[];
}

export function CreateDealModal({ isOpen, onClose, contacts }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    value: 0,
    contact_id: "",
    stage: CRM_CONFIG.pipeline[0].id,
    priority: "medium",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDeal({
        ...formData,
        value: Number(formData.value),
      });
      onClose();
      setFormData({
        title: "",
        value: 0,
        contact_id: "",
        stage: CRM_CONFIG.pipeline[0].id,
        priority: "medium",
      });
    } catch (error) {
      console.error("Error creating deal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-card relative w-full max-w-lg p-8 rounded-3xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tighter">New Negotiation</h2>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Add a new deal to your pipeline</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">Deal Title</label>
            <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
              <Briefcase size={16} />
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Enterprise License" 
                className="bg-transparent text-sm outline-none w-full text-foreground"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Value (USD)</label>
              <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
                <DollarSign size={16} />
                <input 
                  type="number" 
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  placeholder="5000" 
                  className="bg-transparent text-sm outline-none w-full text-foreground"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Priority</label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm font-bold outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-800"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">Client / Contact</label>
            <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
              <User size={16} />
              <select 
                value={formData.contact_id}
                onChange={(e) => setFormData({ ...formData, contact_id: e.target.value })}
                className="bg-transparent text-sm outline-none w-full text-foreground font-bold"
                required
              >
                <option value="">Select a contact...</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>{c.first_name} {c.last_name} ({c.company})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Create Deal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
