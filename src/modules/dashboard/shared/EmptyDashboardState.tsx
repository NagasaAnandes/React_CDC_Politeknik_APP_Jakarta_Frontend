import React from "react";

export const EmptyDashboardState: React.FC<{
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ title, description, actionLabel, onAction }) => {
  return (
    <div
      style={{
        padding: 24,
        textAlign: "center",
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600 }}>{title}</div>
      {description ? (
        <div style={{ color: "#6b7280", marginTop: 8 }}>{description}</div>
      ) : null}
      {actionLabel ? (
        <div style={{ marginTop: 12 }}>
          <button
            onClick={onAction}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            {actionLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default EmptyDashboardState;
