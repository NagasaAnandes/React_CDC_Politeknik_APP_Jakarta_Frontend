import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const AdminLayout: React.FC = () => {
  return <DashboardLayout brand="Admin Console" role="SUPER_ADMIN" />;
};

export default AdminLayout;
