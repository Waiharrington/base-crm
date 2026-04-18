import { EntityProfile } from "@/components/crm/EntityProfile";
import { getContactById } from "@/app/actions/crm";
import { notFound } from "next/navigation";

export default async function ContactPage({ params }: { params: { id: string } }) {
  const contact = await getContactById(params.id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <EntityProfile contact={contact} />
    </div>
  );
}
