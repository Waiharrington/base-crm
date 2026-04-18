"use client";

import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  MessageSquare, 
  Plus, 
  History,
  Briefcase,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export function EntityProfile() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl font-black">
            JD
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">John Doe</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-black uppercase text-success">Active</span>
              <span className="text-sm font-semibold text-slate-400">Lead • Corporate Client</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold hover:bg-slate-50 transition-all">
            <MessageSquare size={16} /> Send Message
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <Plus size={16} /> New Deal
          </button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Left Column: Profile Data */}
        <div className="lg:col-span-3 space-y-6">
          <section className="glass-card p-6 rounded-2xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Contact Details</h3>
            <div className="space-y-4">
              <DetailItem icon={Mail} label="Email" value="john.doe@enterprise.com" />
              <DetailItem icon={Phone} label="Phone" value="+1 (555) 000-1234" />
              <DetailItem icon={Building2} label="Company" value="Enterprise Corp" />
              <DetailItem icon={MapPin} label="Location" value="New York, USA" />
            </div>
          </section>

          <section className="glass-card p-6 rounded-2xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Tag color="primary">High Priority</Tag>
              <Tag color="accent">Q4 Prospect</Tag>
              <Tag color="success">Verified</Tag>
            </div>
          </section>
        </div>

        {/* Center Column: Timeline */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-card p-1 rounded-xl flex items-center gap-1 mb-6">
            <Tab active>Timeline</Tab>
            <Tab>Tasks</Tab>
            <Tab>Emails</Tab>
            <Tab>Calls</Tab>
          </div>

          <div className="relative pl-8 space-y-8">
            <div className="timeline-line" />
            
            <TimelineItem 
              icon={Plus} 
              title="New Lead Created" 
              time="2 hours ago" 
              content="Lead was automatically imported from Website Form." 
              type="system"
            />
            
            <TimelineItem 
              icon={MessageSquare} 
              title="Note added by Admin" 
              time="1 hour ago" 
              content="Client is interested in the Enterprise plan. Requested a demo for next Tuesday." 
              type="manual"
            />

            <TimelineItem 
               icon={Briefcase} 
               title="Status changed to 'Negotiation'" 
               time="30 mins ago" 
               content="The deal pipeline stage has been updated." 
               type="status"
            />
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-3 space-y-6">
          <section className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Open Deals</h3>
              <span className="text-primary font-bold text-xs">2 Deals</span>
            </div>
            <div className="space-y-3">
              <DealCard title="Cloud Migration" value="$12,000" status="Negotiation" />
              <DealCard title="Security Audit" value="$4,500" status="Discovery" />
            </div>
          </section>

          <section className="glass-card p-6 rounded-2xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Documents</h3>
            <div className="space-y-3">
              <DocumentItem name="proposal_v1.pdf" size="1.2 MB" />
              <DocumentItem name="contract_draft.docx" size="450 KB" />
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}

// Helper Components
function DetailItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-black uppercase text-slate-400">{label}</span>
      <div className="flex items-center gap-2 text-sm font-bold">
        <Icon size={14} className="text-primary" />
        {value}
      </div>
    </div>
  );
}

function Tag({ children, color }: any) {
  const colors: any = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
  };
  return (
    <span className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase", colors[color])}>
      {children}
    </span>
  );
}

function Tab({ children, active }: any) {
  return (
    <button className={cn(
      "flex-1 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all",
      active ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600"
    )}>
      {children}
    </button>
  );
}

function TimelineItem({ icon: Icon, title, time, content, type }: any) {
  const iconColors: any = {
    system: "bg-slate-100 text-slate-500",
    manual: "bg-primary/10 text-primary",
    status: "bg-accent/10 text-accent",
  };
  return (
    <div className="relative">
      <div className={cn("absolute -left-[2.15rem] flex h-8 w-8 items-center justify-center rounded-full border bg-white z-10", iconColors[type])}>
        <Icon size={14} />
      </div>
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-black">{title}</h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{time}</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

function DealCard({ title, value, status }: any) {
  return (
    <div className="rounded-xl border bg-slate-50 p-3 dark:bg-slate-800/50 hover:border-primary transition-all cursor-pointer group">
      <h4 className="text-xs font-bold group-hover:text-primary transition-colors">{title}</h4>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-black">{value}</span>
        <span className="text-[9px] font-black uppercase text-slate-400">{status}</span>
      </div>
    </div>
  );
}

function DocumentItem({ name, size }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-xl border border-dashed border-slate-200 hover:border-primary transition-all cursor-pointer">
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-slate-400" />
        <span className="text-xs font-bold truncate w-32">{name}</span>
      </div>
      <span className="text-[9px] font-black text-slate-400 uppercase">{size}</span>
    </div>
  );
}
