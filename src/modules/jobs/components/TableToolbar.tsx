import React from "react";

export const TableToolbar: React.FC<{
  value?: string;
  onChange?: (v: string) => void;
  onCreate?: () => void;
}> = ({ value, onChange, onCreate }) => {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <input
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search jobs..."
          className="input input-sm w-full min-w-0 sm:max-w-xs"
        />
      </div>
      <div className="flex justify-end sm:shrink-0">
        <button
          onClick={onCreate}
          className="btn btn-sm btn-primary w-full sm:w-auto"
        >
          Create Job
        </button>
      </div>
    </div>
  );
};

export default TableToolbar;
