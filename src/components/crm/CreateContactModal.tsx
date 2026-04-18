"use client";

import React, { useState } from "react";
import { X, User, Mail, Phone, Building2, Loader2, Plus } from "lucide-react";
import { createContact } from "@/app/actions/crm";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateContactModal({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createContact(formData);
      onClose();
      setFormData({ first_name: "", last_name: "", email: "", phone: "", company: "" });
    } catch (error) {
      console.error("Error creating contact:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-card relative w-full max-w-lg p-6 md:p-8 rounded-2xl md:rounded-3xl animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tighter">Create Contact</h2>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Add a new person to your CRM</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">First Name</label>
              <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
                <User size={16} />
                <input 
                  type="text" 
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="John" 
                  className="bg-transparent text-sm outline-none w-full text-foreground"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Last Name</label>
              <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
                <User size={16} />
                <input 
                  type="text" 
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Doe" 
                  className="bg-transparent text-sm outline-none w-full text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
            <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
              <Mail size={16} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com" 
                className="bg-transparent text-sm outline-none w-full text-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">Phone Number</label>
            <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
              <Phone size={16} />
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000" 
                className="bg-transparent text-sm outline-none w-full text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">Company Name</label>
            <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2 text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800">
              <Building2 size={16} />
              <input 
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Enterprise Corp" 
                className="bg-transparent text-sm outline-none w-full text-foreground"
              />
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
              {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Save Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
