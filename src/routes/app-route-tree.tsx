import React from "react";
import { Navigate, Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import CompanyLayout from "@/layouts/CompanyLayout";
import StudentLayout from "@/layouts/StudentLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleGuard from "./RoleGuard";
import { LoginPage } from "@/modules/auth/pages/login-page";
import PublicLandingPage from "@/modules/public/pages/public-landing-page";
import AdminDashboardPage from "@/modules/admin/pages/admin-dashboard-page";
import AdminUsersPage from "@/modules/admin/pages/admin-users-page";
import AdminJobsPage from "@/modules/admin/pages/admin-jobs-page";
import AdminCompaniesPage from "@/modules/admin/pages/admin-companies-page";
import CompanyDashboardPage from "@/modules/company/pages/company-dashboard-page";
import CompanyJobsPage from "@/modules/company/pages/company-jobs-page";
import CompanyApplicationsPage from "@/modules/company/pages/company-applications-page";
import AppDashboardPage from "@/modules/app/pages/app-dashboard-page";
import AppJobsPage from "@/modules/app/pages/app-jobs-page";
import AppBookmarksPage from "@/modules/app/pages/app-bookmarks-page";
import AppProfilePage from "@/modules/app/pages/app-profile-page";
import type { Role } from "@/modules/auth/types/user";

type AppRouteConfig = {
  index?: boolean;
  path?: string;
  element: React.ReactElement;
  children?: AppRouteConfig[];
};

type RouteGroupConfig = {
  id: string;
  path?: string;
  element: React.ReactElement;
  children: AppRouteConfig[];
};

const renderRoutes = (routes: AppRouteConfig[]): React.ReactNode => {
  return routes.map((route) => {
    if (route.index) {
      return <Route key="index" index element={route.element} />;
    }

    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children ? renderRoutes(route.children) : null}
      </Route>
    );
  });
};

const adminRoles: Role[] = ["SUPER_ADMIN"];
const companyRoles: Role[] = ["COMPANY_ADMIN", "COMPANY_STAFF"];
const appRoles: Role[] = ["ALUMNI", "STUDENT"];

export const routeGroups: RouteGroupConfig[] = [
  {
    id: "public",
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <PublicLandingPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    id: "admin",
    path: "/admin",
    element: (
      <ProtectedRoute>
        <RoleGuard allowed={adminRoles}>
          <AdminLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "jobs", element: <AdminJobsPage /> },
      { path: "companies", element: <AdminCompaniesPage /> },
    ],
  },
  {
    id: "company",
    path: "/company",
    element: (
      <ProtectedRoute>
        <RoleGuard allowed={companyRoles}>
          <CompanyLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CompanyDashboardPage /> },
      { path: "jobs", element: <CompanyJobsPage /> },
      { path: "applications", element: <CompanyApplicationsPage /> },
    ],
  },
  {
    id: "app",
    path: "/app",
    element: (
      <ProtectedRoute>
        <RoleGuard allowed={appRoles}>
          <StudentLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AppDashboardPage /> },
      { path: "jobs", element: <AppJobsPage /> },
      { path: "bookmarks", element: <AppBookmarksPage /> },
      { path: "profile", element: <AppProfilePage /> },
    ],
  },
];

export const renderRouteGroups = (
  groups: RouteGroupConfig[],
): React.ReactNode => {
  return groups.map((group) => (
    <Route key={group.id} path={group.path} element={group.element}>
      {renderRoutes(group.children)}
    </Route>
  ));
};

export const fallbackRoute = (
  <Route path="*" element={<Navigate to="/" replace />} />
);
