import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  House,
  LayoutDashboard,
  LogIn,
  Sparkles,
  Users,
  UserRound,
} from "lucide-react";
import { appPaths } from "./paths";
import type { NavigationGroup, NavigationItem, RouteMetadata } from "./types";

const allRoles = [
  "SUPER_ADMIN",
  "COMPANY_ADMIN",
  "COMPANY_STAFF",
  "ALUMNI",
  "STUDENT",
] as const;

export const publicNavigationItems: NavigationItem[] = [
  {
    id: "public-home",
    label: "Beranda",
    path: appPaths.public.home,
    icon: House,
    roles: [...allRoles],
    exact: true,
  },
  {
    id: "public-login",
    label: "Masuk",
    path: appPaths.public.login,
    icon: LogIn,
    roles: [...allRoles],
  },
  {
    id: "public-portal",
    label: "Portal",
    path: appPaths.app.root,
    icon: Sparkles,
    roles: [...allRoles],
  },
];

export const dashboardNavigationGroups: NavigationGroup[] = [
  {
    id: "admin-overview",
    label: "Overview",
    roles: ["SUPER_ADMIN"],
    items: [
      {
        id: "admin-dashboard",
        label: "Dashboard",
        path: appPaths.admin.root,
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN"],
        exact: true,
      },
    ],
  },
  {
    id: "admin-management",
    label: "Management",
    roles: ["SUPER_ADMIN"],
    items: [
      {
        id: "admin-users",
        label: "Users",
        path: appPaths.admin.users,
        icon: Users,
        roles: ["SUPER_ADMIN"],
      },
      {
        id: "admin-companies",
        label: "Companies",
        path: appPaths.admin.companies,
        icon: Building2,
        roles: ["SUPER_ADMIN"],
      },
      {
        id: "admin-jobs",
        label: "Jobs",
        path: appPaths.admin.jobs,
        icon: BriefcaseBusiness,
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    id: "company-overview",
    label: "Overview",
    roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
    items: [
      {
        id: "company-dashboard",
        label: "Dashboard",
        path: appPaths.company.root,
        icon: LayoutDashboard,
        roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
        exact: true,
      },
    ],
  },
  {
    id: "company-talent",
    label: "Talent Ops",
    roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
    items: [
      {
        id: "company-jobs",
        label: "Jobs",
        path: appPaths.company.jobs,
        icon: BriefcaseBusiness,
        roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
      },
      {
        id: "company-applications",
        label: "Applications",
        path: appPaths.company.applications,
        icon: ClipboardList,
        roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
      },
    ],
  },
  {
    id: "app-overview",
    label: "Career",
    roles: ["ALUMNI", "STUDENT"],
    items: [
      {
        id: "app-dashboard",
        label: "Dashboard",
        path: appPaths.app.root,
        icon: LayoutDashboard,
        roles: ["ALUMNI", "STUDENT"],
        exact: true,
      },
      {
        id: "app-jobs",
        label: "Jobs",
        path: appPaths.app.jobs,
        icon: BriefcaseBusiness,
        roles: ["ALUMNI", "STUDENT"],
      },
      {
        id: "app-bookmarks",
        label: "Bookmarks",
        path: appPaths.app.bookmarks,
        icon: Bookmark,
        roles: ["ALUMNI", "STUDENT"],
      },
      {
        id: "app-profile",
        label: "Profile",
        path: appPaths.app.profile,
        icon: UserRound,
        roles: ["ALUMNI", "STUDENT"],
      },
    ],
  },
];

export const routeMetadata: RouteMetadata[] = [
  {
    id: "public-home",
    label: "Beranda",
    path: appPaths.public.home,
    roles: [...allRoles],
    area: "public",
    breadcrumb: [{ label: "Beranda" }],
    exact: true,
  },
  {
    id: "public-login",
    label: "Masuk",
    path: appPaths.public.login,
    roles: [...allRoles],
    area: "auth",
    breadcrumb: [{ label: "Masuk" }],
    exact: true,
  },
  {
    id: "admin-dashboard",
    label: "Dashboard",
    path: appPaths.admin.root,
    roles: ["SUPER_ADMIN"],
    area: "admin",
    breadcrumb: [
      { label: "Admin", path: appPaths.admin.root },
      { label: "Dashboard" },
    ],
    exact: true,
  },
  {
    id: "admin-users",
    label: "Users",
    path: appPaths.admin.users,
    roles: ["SUPER_ADMIN"],
    area: "admin",
    breadcrumb: [
      { label: "Admin", path: appPaths.admin.root },
      { label: "Users" },
    ],
  },
  {
    id: "admin-companies",
    label: "Companies",
    path: appPaths.admin.companies,
    roles: ["SUPER_ADMIN"],
    area: "admin",
    breadcrumb: [
      { label: "Admin", path: appPaths.admin.root },
      { label: "Companies" },
    ],
  },
  {
    id: "admin-jobs",
    label: "Jobs",
    path: appPaths.admin.jobs,
    roles: ["SUPER_ADMIN"],
    area: "admin",
    breadcrumb: [
      { label: "Admin", path: appPaths.admin.root },
      { label: "Jobs" },
    ],
  },
  {
    id: "company-dashboard",
    label: "Dashboard",
    path: appPaths.company.root,
    roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
    area: "company",
    breadcrumb: [
      { label: "Company", path: appPaths.company.root },
      { label: "Dashboard" },
    ],
    exact: true,
  },
  {
    id: "company-jobs",
    label: "Jobs",
    path: appPaths.company.jobs,
    roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
    area: "company",
    breadcrumb: [
      { label: "Company", path: appPaths.company.root },
      { label: "Jobs" },
    ],
  },
  {
    id: "company-applications",
    label: "Applications",
    path: appPaths.company.applications,
    roles: ["COMPANY_ADMIN", "COMPANY_STAFF"],
    area: "company",
    breadcrumb: [
      { label: "Company", path: appPaths.company.root },
      { label: "Applications" },
    ],
  },
  {
    id: "app-dashboard",
    label: "Dashboard",
    path: appPaths.app.root,
    roles: ["ALUMNI", "STUDENT"],
    area: "app",
    breadcrumb: [
      { label: "Career", path: appPaths.app.root },
      { label: "Dashboard" },
    ],
    exact: true,
  },
  {
    id: "app-jobs",
    label: "Jobs",
    path: appPaths.app.jobs,
    roles: ["ALUMNI", "STUDENT"],
    area: "app",
    breadcrumb: [
      { label: "Career", path: appPaths.app.root },
      { label: "Jobs" },
    ],
  },
  {
    id: "app-bookmarks",
    label: "Bookmarks",
    path: appPaths.app.bookmarks,
    roles: ["ALUMNI", "STUDENT"],
    area: "app",
    breadcrumb: [
      { label: "Career", path: appPaths.app.root },
      { label: "Bookmarks" },
    ],
  },
  {
    id: "app-profile",
    label: "Profile",
    path: appPaths.app.profile,
    roles: ["ALUMNI", "STUDENT"],
    area: "app",
    breadcrumb: [
      { label: "Career", path: appPaths.app.root },
      { label: "Profile" },
    ],
  },
];
