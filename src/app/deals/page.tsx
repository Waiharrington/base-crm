import { KanbanBoard } from "@/components/crm/KanbanBoard";
import { Plus, Filter, Download } from "lucide-react";
import { getDeals, getContacts } from "@/app/actions/crm";

export default async function DealsPage() {
  const [initialDeals, contacts] = await Promise.all([
    getDeals(),
    getContacts()
  ]);

  return (
    <div className="space-y-6">
      <KanbanBoard initialDeals={initialDeals} contacts={contacts} />
    </div>
  );
}
