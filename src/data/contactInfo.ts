import { Phone, Mail, Clock, type LucideIcon } from "lucide-react";

export type ContactDetail = {
  icon: LucideIcon;
  title: string;
  info: string;
  link: string | null;
};

export const contactDetails: ContactDetail[] = [
  { icon: Phone, title: "Customer Care", info: "(234) 905-841-3864", link: "tel:+2349058413864" },
  { icon: Mail, title: "Email", info: "info@tranex-ng.com", link: "mailto:info@tranex-ng.com" },
  { icon: Clock, title: "Working Hours", info: "24/7", link: null },
];
