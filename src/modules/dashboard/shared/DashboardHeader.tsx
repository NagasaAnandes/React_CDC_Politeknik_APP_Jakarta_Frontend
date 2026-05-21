import React from "react";

export const DashboardHeader: React.FC<{
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}> = ({ title, subtitle, actions }) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 22 }}>{title}</h1>
        {subtitle ? <div style={{ color: "#6b7280" }}>{subtitle}</div> : null}
      </div>
      <div>{actions}</div>
    </header>
  );
};

export default DashboardHeader;
