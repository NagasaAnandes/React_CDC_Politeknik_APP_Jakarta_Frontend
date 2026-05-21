import React from "react";

export const TableEmptyState: React.FC<{
  title?: string;
  description?: string;
}> = ({
  title = "No jobs found",
  description = "Try adjusting filters or create a new job.",
}) => (
  <div className="p-6 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-slate-500 mt-2">{description}</p>
  </div>
);

export default TableEmptyState;
