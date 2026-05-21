import type { FC } from "react";
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import type { NavigationGroup, NavigationItem } from "../../config/navigation";

type DashboardSidebarProps = {
  brand: string;
  groups: NavigationGroup[];
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapseToggle: () => void;
  onMobileClose: () => void;
};

const NavItemRow: FC<{ item: NavigationItem; collapsed: boolean }> = ({
  item,
  collapsed,
}) => {
  const Icon = item.icon;

  return (
    <div className="space-y-1">
      <NavLink
        to={item.path}
        end={item.exact}
        className={({ isActive }) =>
          cn(
            "group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed ? "justify-center px-2" : "",
          )
        }
      >
        {Icon ? <Icon className="size-4 shrink-0" /> : null}
        {!collapsed ? <span className="truncate">{item.label}</span> : null}
      </NavLink>
      {item.children?.length && !collapsed ? (
        <div className="ml-4 space-y-1 border-l border-border pl-3">
          {item.children.map((child) => (
            <NavItemRow key={child.id} item={child} collapsed={collapsed} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  brand,
  groups,
  collapsed,
  mobileOpen,
  onCollapseToggle,
  onMobileClose,
}) => {
  return (
    <>
      <aside
        className={cn(
          "hidden h-screen shrink-0 border-r border-border bg-background/95 backdrop-blur md:sticky md:top-0 md:flex md:flex-col",
          collapsed ? "md:w-20" : "md:w-80",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
          {!collapsed ? (
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                CDC
              </p>
              <h2 className="truncate text-base font-semibold">{brand}</h2>
            </div>
          ) : (
            <div className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background">
              C
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onCollapseToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </Button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
          {groups.map((group: NavigationGroup) => (
            <section key={group.id} className="space-y-3">
              {!collapsed ? (
                <div className="flex items-center justify-between px-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {group.label}
                  </h3>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </div>
              ) : null}
              <div className="space-y-1">
                {group.items.map((item: NavigationItem) => (
                  <NavItemRow key={item.id} item={item} collapsed={collapsed} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
          />
          <aside className="absolute inset-y-0 left-0 w-[88vw] max-w-sm border-r border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  CDC
                </p>
                <h2 className="truncate text-base font-semibold">{brand}</h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onMobileClose}
              >
                <PanelLeftClose className="size-4" />
              </Button>
            </div>
            <div className="h-full overflow-y-auto px-3 py-4">
              {groups.map((group: NavigationGroup) => (
                <section key={group.id} className="mb-6 space-y-3 last:mb-0">
                  <h3 className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {group.label}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item: NavigationItem) => (
                      <NavItemRow key={item.id} item={item} collapsed={false} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default DashboardSidebar;
