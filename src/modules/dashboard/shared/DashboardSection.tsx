import React from "react";

type Props = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
};

export const DashboardSection: React.FC<Props> = ({
  title,
  description,
  actions,
  loading,
  children,
}) => {
  return (
    <section style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
          {description ? (
            <div style={{ fontSize: 13, color: "#6b7280" }}>{description}</div>
          ) : null}
        </div>
        <div>{actions}</div>
      </div>
      <div>
        {loading ? (
          <div style={{ color: "#6b7280" }}>Loading...</div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default DashboardSection;
