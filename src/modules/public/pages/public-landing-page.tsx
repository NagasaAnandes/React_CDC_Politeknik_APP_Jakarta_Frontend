import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";

export const PublicLandingPage: FC = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-border bg-background/80 px-6 py-10 shadow-sm md:px-10">
        <div className="max-w-2xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Career Developer Center
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Sistem karier yang siap tumbuh bersama semua role.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Fondasi dashboard, navigasi, dan layout dipisahkan agar module
            berikutnya bisa ditambahkan tanpa mengacak struktur aplikasi.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/login">Masuk</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/app">Lihat Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      <EmptyState
        title="Public shell siap"
        description="Gunakan area ini sebagai fondasi landing, CTA, dan onboarding sebelum marketing UI final dibangun."
      />
    </div>
  );
};

export default PublicLandingPage;
