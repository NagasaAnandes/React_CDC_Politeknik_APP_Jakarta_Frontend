import React from "react";

export const DashboardGrid: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 16,
        alignItems: "start",
      }}
    >
      {React.Children.map(children, (child) => (
        <div style={{ gridColumn: "span 4" }}>{child}</div>
      ))}
    </div>
  );
};

export default DashboardGrid;
