import { KanbanBoard } from "@/components/crm/KanbanBoard";
import { Plus, Filter, Download } from "lucide-react";

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Negotiations</h1>
          <p className="text-slate-500 font-semibold">Track your sales pipeline and move deals to closing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold hover:bg-slate-50 transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold hover:bg-slate-50 transition-all">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <Plus size={16} /> New Deal
          </button>
        </div>
      </div>

      <KanbanBoard />
    </div>
  );
}
