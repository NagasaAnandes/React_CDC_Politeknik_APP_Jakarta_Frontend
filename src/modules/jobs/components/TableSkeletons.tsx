import React from "react";

export const JobsTableSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
      ))}
    </div>
  );
};

export const JobCardSkeleton: React.FC = () => (
  <div className="p-4 border rounded shadow-sm animate-pulse">
    <div className="h-6 bg-gray-100 w-3/4 mb-2" />
    <div className="h-4 bg-gray-100 w-1/2" />
  </div>
);

export default { JobsTableSkeleton, JobCardSkeleton };
