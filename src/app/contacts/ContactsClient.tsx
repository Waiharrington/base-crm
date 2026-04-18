"use client";

import React, { useState } from "react";
import { Users, Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CreateContactModal } from "@/components/crm/CreateContactModal";

export function ContactsClient({ initialContacts }: { initialContacts: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contacts = initialContacts;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter">Contacts</h1>
          <p className="text-slate-500 font-semibold text-sm md:text-base">Manage your customer database and relationships.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all"
        >
          <Plus size={18} /> New Entry
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-1 items-center gap-3 rounded-xl border bg-white px-3 py-2 text-slate-400 focus-within:border-primary transition-all dark:bg-slate-900 dark:border-slate-800">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search contacts by name, email or company..." 
            className="bg-transparent text-sm outline-none w-full text-foreground"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold hover:bg-slate-50 transition-all dark:border-slate-800">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="glass-card overflow-hidden rounded-2xl border">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left min-w-[700px] md:min-w-full">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b">
              <tr>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Company</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {contacts.map((contact: any) => (
                <tr key={contact.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group">
                  <td className="px-4 md:px-6 py-4">
                    <Link href={`/contacts/${contact.id}`} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {contact.first_name[0]}{contact.last_name?.[0]}
                      </div>
                      <span className="text-sm font-bold group-hover:text-primary transition-colors">{contact.first_name} {contact.last_name}</span>
                    </Link>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{contact.company}</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{contact.phone}</td>
                  <td className="px-4 md:px-6 py-4">
                     <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase",
                      contact.status === 'Active' ? "bg-success/10 text-success" : "bg-slate-100 text-slate-400"
                    )}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 md:px-6 py-20 text-center">
                     <div className="flex flex-col items-center gap-2">
                        <Users size={48} className="text-slate-200" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No contacts found</p>
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="text-primary text-xs font-black uppercase mt-2 hover:underline"
                        >
                          + Create your first contact
                        </button>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
