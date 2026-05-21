import type { LucideIcon } from "lucide-react";
import type { Role } from "@/modules/auth/types/user";

export type AppArea = "public" | "auth" | "admin" | "company" | "app";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: LucideIcon;
  roles: Role[];
  exact?: boolean;
  children?: NavigationItem[];
}

export interface NavigationGroup {
  id: string;
  label: string;
  roles: Role[];
  items: NavigationItem[];
}

export interface RouteMetadata {
  id: string;
  label: string;
  path: string;
  roles: Role[];
  area: AppArea;
  breadcrumb: BreadcrumbItem[];
  exact?: boolean;
}
