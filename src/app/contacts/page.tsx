import { getContacts } from "@/app/actions/crm";
import { ContactsClient } from "./ContactsClient";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return <ContactsClient initialContacts={contacts} />;
}
