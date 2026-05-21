import React from "react";
import type { JobListItem } from "../types";
import { ApprovalBadge, EmploymentBadge, WorkModeBadge } from "./Badges";
import { JobsTableSkeleton } from "./TableSkeletons";

export const DataTable: React.FC<{
  items: JobListItem[];
  loading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}> = ({ items, loading, onEdit, onDelete }) => {
  if (loading) return <JobsTableSkeleton />;
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-180 w-full table-auto">
        <thead className="sticky top-0 bg-background">
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
              <td className="py-2 pr-4 align-top max-w-sm">
                <div className="font-medium wrap-break-word">{it.title}</div>
                <div className="text-xs text-slate-500 wrap-break-word">
                  {it.shortDescription}
                </div>
              </td>
              <td className="max-w-xs align-top truncate">
                {it.companyName ?? "—"}
              </td>
              <td className="align-top">
                <EmploymentBadge type={it.employmentType} />
              </td>
              <td className="align-top">
                <WorkModeBadge mode={it.workMode} />
              </td>
              <td className="align-top">
                <ApprovalBadge status={it.approvalStatus} />
              </td>
              <td className="align-top text-right">
                <div className="flex flex-wrap justify-end gap-2">
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
