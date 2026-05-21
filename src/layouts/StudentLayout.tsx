import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getBreadcrumbsForPath } from "@/config/navigation";
import DashboardBreadcrumbs from "@/components/dashboard/DashboardBreadcrumbs";

export const StudentLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(248,250,252,1))]">
      <header className="border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
          <Link
            to="/app"
            className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          >
            Career Portal
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button
              asChild
              variant={location.pathname === "/app" ? "secondary" : "ghost"}
              size="sm"
            >
              <Link to="/app">Overview</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/login">Masuk</Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl px-4 pb-3 md:px-6">
          <DashboardBreadcrumbs
            items={getBreadcrumbsForPath(location.pathname)}
          />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
