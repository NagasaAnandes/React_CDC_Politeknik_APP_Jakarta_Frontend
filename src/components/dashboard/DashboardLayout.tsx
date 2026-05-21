import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import useAuthStore from "@/modules/auth/store/auth.store";
import type { Role } from "@/modules/auth/types/user";
import {
  getBreadcrumbsForPath,
  getDashboardNavigationGroups,
} from "@/config/navigation";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

type DashboardLayoutProps = {
  brand: string;
  role: Role;
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({ brand, role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationGroups = useMemo(
    () => getDashboardNavigationGroups(user?.role ?? role),
    [role, user?.role],
  );

  const breadcrumbs = useMemo(
    () => getBreadcrumbsForPath(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.06),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.04),_transparent_24%),linear-gradient(to_bottom,_rgba(255,255,255,0.98),_rgba(248,250,252,1))] text-foreground dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.06),_transparent_26%),linear-gradient(to_bottom,_rgba(2,6,23,1),_rgba(15,23,42,1))]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <DashboardSidebar
          brand={brand}
          groups={navigationGroups}
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onCollapseToggle={() => setCollapsed((value) => !value)}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar
            brand={brand}
            breadcrumbs={breadcrumbs}
            role={user?.role ?? role}
            userName={user?.name}
            onMenuClick={() => setMobileOpen(true)}
            onLogout={handleLogout}
          />

          <main className={cn("flex-1 px-4 py-6 md:px-6 lg:px-8")}>
            <div className="mx-auto max-w-7xl space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
