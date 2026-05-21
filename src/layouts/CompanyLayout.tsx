import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const CompanyLayout: React.FC = () => {
  return <DashboardLayout brand="Company Workspace" role="COMPANY_ADMIN" />;
};

export default CompanyLayout;
