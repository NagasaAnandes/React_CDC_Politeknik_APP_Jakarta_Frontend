import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { LogOut, Menu, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardBreadcrumbs from "./DashboardBreadcrumbs";
import type { BreadcrumbItem } from "@/config/navigation";
import type { Role } from "@/modules/auth/types/user";

type DashboardTopbarProps = {
  brand: string;
  breadcrumbs: BreadcrumbItem[];
  role?: Role | null;
  userName?: string;
  onMenuClick: () => void;
  onLogout: () => void;
};

export const DashboardTopbar: FC<DashboardTopbarProps> = ({
  brand,
  breadcrumbs,
  role,
  userName,
  onMenuClick,
  onLogout,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex min-h-16 items-center gap-3 px-4 py-3 md:px-6">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </Button>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {brand}
            </p>
            {role ? (
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {role.replace(/_/g, " ")}
              </span>
            ) : null}
          </div>
          <DashboardBreadcrumbs items={breadcrumbs} />
        </div>

        <div ref={menuRef} className="relative ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUserMenuOpen((value) => !value)}
            className={cn(
              "hidden items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-sm md:flex",
              userMenuOpen ? "bg-muted" : "",
            )}
          >
            <UserCircle2 className="size-4 text-muted-foreground" />
            <span className="max-w-[180px] truncate font-medium text-foreground">
              {userName ?? "Dashboard User"}
            </span>
          </button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setUserMenuOpen((value) => !value)}
            aria-label="Open user menu"
          >
            <UserCircle2 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="gap-2"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>

          {userMenuOpen ? (
            <div className="absolute right-0 top-12 z-40 w-56 rounded-2xl border border-border bg-background p-2 shadow-lg">
              <div className="space-y-1 rounded-xl bg-muted/50 p-3">
                <p className="text-sm font-semibold">
                  {userName ?? "Dashboard User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {role?.replace(/_/g, " ")}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="mt-2 w-full justify-start"
                onClick={onLogout}
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
