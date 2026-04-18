import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardCharts } from "@/components/crm/DashboardCharts";
import { getDashboardStats } from "@/app/actions/crm";

export default async function Home() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Dashboard</h1>
          <p className="text-slate-500 font-semibold">Welcome back, here is what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={18} /> New Entry
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Contacts" value={stats.contacts.toString()} change="+0%" positive />
        <StatCard icon={Briefcase} label="Active Deals" value={stats.deals.toString()} change="+0%" positive />
        <StatCard icon={TrendingUp} label="Revenue" value={`$${stats.revenue.toLocaleString()}`} change="+0%" positive={true} />
        <StatCard icon={Clock} label="Pending Tasks" value="0" valueColor="text-warning" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Charts and Activity */}
        <DashboardCharts />
        
        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Recent Activity</h3>
            <button className="text-[10px] font-black uppercase text-primary transition-all hover:tracking-widest">View All</button>
          </div>
          <div className="space-y-6">
            <ActivityItem 
              title="New Deal Created" 
              desc="Cloud Migration project for Enterprise Corp." 
              time="12 minutes ago" 
              color="bg-primary/10 text-primary"
            />
            <ActivityItem 
              title="Proposal Sent" 
              desc="Sent to John Doe for Security Audit." 
              time="45 minutes ago" 
              color="bg-accent/10 text-accent"
            />
             <ActivityItem 
              title="Meeting Scheduled" 
              desc="Demo with Sarah Smith regarding Enterprise Plan." 
              time="2 hours ago" 
              color="bg-success/10 text-success"
            />
          </div>
        </div>

        {/* Quick Actions / Shortcuts */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Quick Links</h3>
          <div className="grid grid-cols-1 gap-3">
             <QuickLink href="/contacts" label="View All Contacts" />
             <QuickLink href="/deals" label="Active Negotiations" />
             <QuickLink href="/analytics" label="Sales Reports" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, positive, valueColor = "text-foreground" }: any) {
  return (
    <div className="glass-card p-6 rounded-2xl group hover:border-primary transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="rounded-xl bg-slate-100 p-2.5 dark:bg-slate-800 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all">
          <Icon size={20} />
        </div>
        {change && (
          <span className={cn(
            "text-[10px] font-black px-2 py-0.5 rounded-full",
            positive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {change}
          </span>
        )}
      </div>
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
      <h2 className={cn("text-2xl font-black mt-1", valueColor)}>{value}</h2>
    </div>
  );
}

function ActivityItem({ title, desc, time, color }: any) {
  return (
    <div className="flex gap-4">
      <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl", color)}>
        <TrendingUp size={18} />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs text-slate-500 font-medium">{desc}</p>
        <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{time}</span>
      </div>
    </div>
  );
}

function QuickLink({ href, label }: any) {
  return (
    <a href={href} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm hover:border-primary transition-all font-bold text-sm text-slate-700">
      {label}
      <Plus size={14} className="text-slate-400" />
    </a>
  );
}
