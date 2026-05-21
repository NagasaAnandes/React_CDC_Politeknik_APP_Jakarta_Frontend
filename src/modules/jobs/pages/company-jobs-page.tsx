import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { JobsListResponse, JobListItem } from "../types";
import jobsApi from "../api/jobs.api";
import DataTable from "../components/DataTable";
import TableToolbar from "../components/TableToolbar";
import TableEmptyState from "../components/TableEmptyState";
import usePaginationState from "../hooks/usePaginationState";
import useJobFilters from "../hooks/useJobFilters";
import { useNavigate } from "react-router-dom";

const CompanyJobsPage: React.FC = () => {
  const { skip, take } = usePaginationState({ skip: 0, take: 10 });
  const { q, toParams, setSearch } = useJobFilters();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<
    { success: true; data: JobsListResponse<JobListItem> },
    unknown
  >({
    queryKey: ["company-jobs", { skip, take, ...toParams }],
    queryFn: () => jobsApi.listJobs({ skip, take, q }),
    placeholderData: (previousData) => previousData,
  });

  const items = data?.data?.items ?? [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Company Jobs</h2>
      <TableToolbar
        value={q}
        onChange={setSearch}
        onCreate={() => navigate("/company/jobs/create")}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : items.length === 0 ? (
        <TableEmptyState />
      ) : (
        <DataTable
          items={items}
          onEdit={(id) => navigate(`/company/jobs/${id}/edit`)}
          onDelete={(id) => console.log("delete", id)}
        />
      )}
    </div>
  );
};

export default CompanyJobsPage;
