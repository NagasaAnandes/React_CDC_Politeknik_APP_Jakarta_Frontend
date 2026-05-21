import type { FC } from "react";
import EmptyState from "@/components/ui/empty-state";

export const AdminDashboardPage: FC = () => (
  <EmptyState
    title="Admin Dashboard"
    description="Ruang ini disiapkan untuk insight, governance, dan operasi administratif sebelum modul CRUD ditambahkan."
  />
);

export default AdminDashboardPage;
