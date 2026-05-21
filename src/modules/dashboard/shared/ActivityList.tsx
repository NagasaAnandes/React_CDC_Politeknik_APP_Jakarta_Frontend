import React from "react";

type Activity = { id: string; text: string; time?: string };

export const ActivityList: React.FC<{ items: Activity[] }> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div style={{ color: "#6b7280" }}>No recent activity</div>;
  }

  return (
    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
      {items.map((it) => (
        <li
          key={it.id}
          style={{ padding: 10, borderBottom: "1px solid #f3f4f6" }}
        >
          <div style={{ fontSize: 14 }}>{it.text}</div>
          {it.time ? (
            <div style={{ fontSize: 12, color: "#9ca3af" }}>{it.time}</div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;
