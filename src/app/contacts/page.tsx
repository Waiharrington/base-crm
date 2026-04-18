import { Users, Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const contacts = [
  { id: "1", name: "John Doe", company: "Enterprise Corp", email: "john@enterprise.com", phone: "+1 555-0101", status: "Active" },
  { id: "2", name: "Sarah Smith", company: "BioTech", email: "sarah@biotech.io", phone: "+1 555-0202", status: "Lead" },
  { id: "3", name: "Robert Brown", company: "Global Log", email: "robert@global.com", phone: "+1 555-0303", status: "Inactive" },
];

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Contacts</h1>
          <p className="text-slate-500 font-semibold">Manage your customer relationships and lead database.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={16} /> New Contact
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-slate-900/50">
          <div className="flex items-center gap-3 w-full max-w-sm rounded-xl border px-3 py-2 text-slate-400">
            <Search size={16} />
            <input type="text" placeholder="Search contacts..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-500 hover:text-primary transition-all">
            <Filter size={16} /> Filters
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Name</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Company</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Contact</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group">
                <td className="px-6 py-4">
                  <Link href={`/contacts/${contact.id}`} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{contact.name}</span>
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{contact.company}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{contact.email}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400">{contact.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase",
                    contact.status === 'Active' ? "bg-success/10 text-success" : contact.status === 'Lead' ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                  )}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-300 hover:text-slate-600">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
