import React from "react";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div>
      <div
        style={{
          height: 20,
          width: "40%",
          background: "#e5e7eb",
          borderRadius: 6,
          marginBottom: 12,
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{ height: 90, background: "#f3f4f6", borderRadius: 8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
