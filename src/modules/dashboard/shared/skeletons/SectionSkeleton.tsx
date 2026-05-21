import React from "react";

export const SectionSkeleton: React.FC = () => (
  <div style={{ padding: 12, borderRadius: 8, background: "#f8fafc" }}>
    <div
      style={{
        height: 16,
        width: "40%",
        background: "#e5e7eb",
        borderRadius: 4,
      }}
    />
    <div
      style={{
        height: 80,
        marginTop: 12,
        background: "#f3f4f6",
        borderRadius: 6,
      }}
    />
  </div>
);

export default SectionSkeleton;
