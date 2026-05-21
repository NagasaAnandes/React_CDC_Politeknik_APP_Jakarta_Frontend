import React from "react";

export const StatCardSkeleton: React.FC = () => (
  <div style={{ padding: 16, borderRadius: 8, background: "#f3f4f6" }}>
    <div
      style={{
        height: 14,
        width: "50%",
        background: "#e5e7eb",
        borderRadius: 4,
      }}
    />
    <div
      style={{
        height: 24,
        width: "35%",
        marginTop: 8,
        background: "#e5e7eb",
        borderRadius: 4,
      }}
    />
  </div>
);

export default StatCardSkeleton;
