import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { JobsListResponse, JobListItem } from "../types";
import jobsApi from "../api/jobs.api";
import DataTable from "../components/DataTable";
import TableToolbar from "../components/TableToolbar";
import TableEmptyState from "../components/TableEmptyState";
import usePaginationState from "../hooks/usePaginationState";
import useJobFilters from "../hooks/useJobFilters";

const AdminJobsPage: React.FC = () => {
  const { skip, take, setPagination } = usePaginationState({
    skip: 0,
    take: 20,
  });
  const { q, toParams, setSearch } = useJobFilters();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery<
    { success: true; data: JobsListResponse<JobListItem> },
    unknown
  >({
    queryKey: ["admin-jobs", { skip, take, ...toParams }],
    queryFn: () => jobsApi.listJobs({ skip, take, q }),
  });

  const del = useMutation({
    mutationFn: (id: string) => jobsApi.deleteJob(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-jobs"] }),
  });

  const items = (data as any)?.data?.items ?? [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Admin Jobs</h2>
      <TableToolbar
        value={q}
        onChange={setSearch}
        onCreate={() => alert("create")}
      />
      {items.length === 0 && !isLoading ? (
        <TableEmptyState />
      ) : (
        <DataTable
          items={items}
          loading={isLoading}
          onEdit={(id) => alert(`edit ${id}`)}
          onDelete={(id) => del.mutate(id)}
        />
      )}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-slate-500">
          Showing {items.length} items
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPagination({ skip: Math.max(0, skip - take) })}
            disabled={skip === 0}
            className="btn btn-sm"
          >
            Prev
          </button>
          <button
            onClick={() => setPagination({ skip: skip + take })}
            disabled={items.length < take}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobsPage;
