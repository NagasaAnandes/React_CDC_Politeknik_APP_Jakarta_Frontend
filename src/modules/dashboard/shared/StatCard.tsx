import React from "react";

type Props = {
  title: string;
  value: number | string;
  subtitle?: string;
  loading?: boolean;
};

export const StatCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  loading,
}) => {
  if (loading) {
    return (
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          background: "#f3f4f6",
          minWidth: 160,
        }}
      >
        <div
          style={{
            height: 18,
            width: "60%",
            background: "#e5e7eb",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            height: 28,
            width: "40%",
            marginTop: 10,
            background: "#e5e7eb",
            borderRadius: 4,
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        background: "#ffffff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280" }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 600, marginTop: 6 }}>{value}</div>
      {subtitle ? (
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

export default StatCard;
