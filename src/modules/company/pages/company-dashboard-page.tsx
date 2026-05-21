import type { FC } from "react";
import EmptyState from "@/components/ui/empty-state";

export const CompanyDashboardPage: FC = () => (
  <EmptyState
    title="Company Dashboard"
    description="Ruang ringkas untuk hiring overview, status pipeline, dan aktivitas perusahaan."
  />
);

export default CompanyDashboardPage;
