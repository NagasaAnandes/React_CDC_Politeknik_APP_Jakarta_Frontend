import React from "react";

type QuickActionCardProps = { title: string; onClick?: () => void };

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 12,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        background: "#fff",
        cursor: "pointer",
      }}
    >
      {title}
    </button>
  );
};

export default QuickActionCard;
