import React from "react";
import type { JobListItem } from "../types";
import { ApprovalBadge, EmploymentBadge, WorkModeBadge } from "./Badges";

export const DataTable: React.FC<{
  items: JobListItem[];
  loading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}> = ({ items, loading, onEdit, onDelete }) => {
  if (loading) return <div>Loading...</div>;
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-slate-600">
            <th>Title</th>
            <th>Company</th>
            <th>Type</th>
            <th>Mode</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-b">
              <td className="py-2">
                <div className="font-medium">{it.title}</div>
                <div className="text-xs text-slate-500">
                  {it.shortDescription}
                </div>
              </td>
              <td>{it.companyName}</td>
              <td>
                <EmploymentBadge type={it.employmentType} />
              </td>
              <td>
                <WorkModeBadge mode={it.workMode} />
              </td>
              <td>
                <ApprovalBadge status={it.approvalStatus} />
              </td>
              <td className="text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onEdit?.(it.id)}
                    className="text-sm text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(it.id)}
                    className="text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
