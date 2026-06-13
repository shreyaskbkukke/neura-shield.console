import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  permission?: string;
  badge?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  items: NavItem[];
}
