import type { FC } from "react";
import EmptyState from "@/components/ui/empty-state";

export const AppDashboardPage: FC = () => (
  <EmptyState
    title="Career Dashboard"
    description="Ruang ringkas untuk rekomendasi, status aktivitas, dan entry point user."
  />
);

export default AppDashboardPage;
