import React from "react";
import type { ApprovalStatus, EmploymentType, WorkMode } from "../types";

export const ApprovalBadge: React.FC<{ status?: ApprovalStatus }> = ({
  status,
}) => {
  const label = status ?? "DRAFT";
  const color =
    status === "PUBLISHED" || status === "APPROVED"
      ? "bg-green-100 text-green-800"
      : status === "PENDING_APPROVAL"
        ? "bg-yellow-100 text-yellow-800"
        : status === "REJECTED"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {label.replace(/_/g, " ")}
    </span>
  );
};

export const EmploymentBadge: React.FC<{ type?: EmploymentType }> = ({
  type,
}) => {
  const label = type ?? "OTHER";
  return (
    <span className="px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-800">
      {label.replace(/_/g, " ")}
    </span>
  );
};

export const WorkModeBadge: React.FC<{ mode?: WorkMode }> = ({ mode }) => {
  const label = mode ?? "ONSITE";
  return (
    <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-800">
      {label}
    </span>
  );
};

export default { ApprovalBadge, EmploymentBadge, WorkModeBadge };
