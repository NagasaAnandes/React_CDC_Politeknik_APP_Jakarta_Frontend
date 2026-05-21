import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import publicJobsApi from "../api/public-jobs.api";
import { JobCardSkeleton } from "../components/TableSkeletons";
import { Link } from "react-router-dom";
import useJobFilters from "../hooks/useJobFilters";
import type { JobListItem, JobsListResponse } from "../types";

const PublicJobsPage: React.FC = () => {
  const { q } = useJobFilters();

  const res = useInfiniteQuery<
    { success: true; data: JobsListResponse<JobListItem> },
    unknown
  >({
    queryKey: ["public-jobs", { q }],
    queryFn: ({ pageParam = 0 }) =>
      publicJobsApi.listPublicJobs({
        skip: Number(pageParam || 0),
        take: 10,
        q,
      }),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const p = last.data.pagination;
      const next = p.skip + p.take;
      return next < p.total ? next : undefined;
    },
  });

  if (res.isLoading) return <JobCardSkeleton />;

  const pages = res.data?.pages ?? [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Jobs</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {pages
          .flatMap((p) => p.data.items)
          .map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.slug ?? job.id}`}
              className="p-4 border rounded hover:shadow"
            >
              <div className="font-semibold">{job.title}</div>
              <div className="text-sm text-slate-500">
                {job.companyName} • {job.location}
              </div>
            </Link>
          ))}
      </div>
      {res.hasNextPage && (
        <div className="mt-4">
          <button onClick={() => res.fetchNextPage()} className="btn btn-sm">
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicJobsPage;
