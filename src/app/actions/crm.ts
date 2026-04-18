"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- CONTACTS ---

export async function getContacts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
  return data;
}

export async function getContactById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .select("*, activities(*), deals(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
  return data;
}

export async function createContact(formData: { first_name: string; last_name: string; email: string; company: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .insert([formData])
    .select()
    .single();

  if (error) throw error;
  
  // Log activity
  await createActivity(data.id, "system", "Contact Created", "User manually created this contact.");
  
  revalidatePath("/contacts");
  return data;
}

// --- DEALS ---

export async function getDeals() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("deals")
    .select("*, contacts(first_name, last_name, company)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching deals:", error);
    return [];
  }
  return data;
}

export async function updateDealStage(id: string, stage: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("deals")
    .update({ stage })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  
  // Log activity
  if (data.contact_id) {
    await createActivity(data.contact_id, "status", "Deal Stage Updated", `Deal '${data.title}' moved to ${stage}.`);
  }
  
  revalidatePath("/deals");
  return data;
}

// --- ACTIVITIES ---

export async function createActivity(contact_id: string, type: string, title: string, content: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("activities")
    .insert([{ contact_id, type, title, content }]);

  if (error) console.error("Error logging activity:", error);
}

// --- DASHBOARD ---

export async function getDashboardStats() {
  const supabase = await createClient();
  
  const [contactsCount, dealsCount, revenue] = await Promise.all([
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("deals").select("*", { count: "exact", head: true }),
    supabase.from("deals").select("value"),
  ]);

  const totalRevenue = revenue.data?.reduce((acc, deal) => acc + (deal.value || 0), 0) || 0;

  return {
    contacts: contactsCount.count || 0,
    deals: dealsCount.count || 0,
    revenue: totalRevenue,
  };
}
