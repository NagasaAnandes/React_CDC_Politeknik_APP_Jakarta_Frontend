import React from "react";

export const TableToolbar: React.FC<{
  value?: string;
  onChange?: (v: string) => void;
  onCreate?: () => void;
}> = ({ value, onChange, onCreate }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <input
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search jobs..."
          className="input input-sm"
        />
      </div>
      <div>
        <button onClick={onCreate} className="btn btn-sm btn-primary">
          Create Job
        </button>
      </div>
    </div>
  );
};

export default TableToolbar;
