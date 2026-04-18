/**
 * GLOBAL CONFIGURATION FOR BASE CRM
 * 
 * Edit this file to adapt the CRM to different industries (Medical, Industrial, Sales, etc.)
 */

export const CRM_CONFIG = {
  // General Branding
  brand: {
    name: "Base CRM",
    shortName: "BC",
    primaryColor: "#00B8B8", // bitrix-like teal
  },

  // Terminology (Localization/Context)
  labels: {
    entity_singular: "Contact", // e.g. 'Patient', 'Client'
    entity_plural: "Contacts",
    deal_singular: "Deal",       // e.g. 'Appointment', 'Project'
    deal_plural: "Negotiations",
    pipeline_name: "Sales Pipeline",
  },

  // Pipeline Stages Configuration
  pipeline: [
    { id: "discovery", name: "Discovery", color: "bg-slate-400" },
    { id: "negotiation", name: "Negotiation", color: "bg-primary" },
    { id: "proposal", name: "Proposal Sent", color: "bg-accent" },
    { id: "closed", name: "Won / Lost", color: "bg-success" },
  ],

  // Navigation Items
  navigation: [
    { label: "Dashboard", icon: "LayoutDashboard", href: "/" },
    { label: "Negociaciones", icon: "Briefcase", href: "/deals" },
    { label: "Contactos", icon: "Users", href: "/contacts" },
    { label: "Tareas", icon: "CheckSquare", href: "/tasks" },
  ],
};

export type CrmConfig = typeof CRM_CONFIG;
