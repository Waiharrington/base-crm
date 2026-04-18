import { getDashboardStats, getContacts } from "@/app/actions/crm";
import { DashboardClient } from "./DashboardClient";

export default async function Home() {
  const [stats, contacts] = await Promise.all([
    getDashboardStats(),
    getContacts()
  ]);

  return <DashboardClient stats={stats} contacts={contacts} />;
}
