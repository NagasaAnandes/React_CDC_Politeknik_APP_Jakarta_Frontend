import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { publicNavigationItems } from "@/config/navigation";

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.06),_transparent_26%),linear-gradient(to_bottom,_rgba(255,255,255,1),_rgba(248,250,252,1))] text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Open public navigation"
          >
            <Menu className="size-4" />
          </Button>

          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                CDC Platform
              </p>
              <p className="text-sm font-semibold">Career Developer Center</p>
            </div>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {publicNavigationItems.map((item) => (
              <Button
                key={item.id}
                asChild
                variant={
                  location.pathname === item.path ? "secondary" : "ghost"
                }
                size="sm"
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
            <Button asChild size="sm">
              <Link to="/login">Masuk</Link>
            </Button>
          </nav>
        </div>

        {mobileOpen ? (
          <div className="border-t border-border bg-background md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
              {publicNavigationItems.map((item) => (
                <Button
                  key={item.id}
                  asChild
                  variant={
                    location.pathname === item.path ? "secondary" : "ghost"
                  }
                  className="justify-start"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link to={item.path}>{item.label}</Link>
                </Button>
              ))}
              <Button asChild onClick={() => setMobileOpen(false)}>
                <Link to="/login">Masuk</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
