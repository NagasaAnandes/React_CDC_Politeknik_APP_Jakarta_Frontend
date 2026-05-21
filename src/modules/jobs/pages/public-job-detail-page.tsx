import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import publicJobsApi from "../api/public-jobs.api";

const PublicJobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useQuery<any, unknown>({
    queryKey: ["public-job", slug],
    queryFn: () => publicJobsApi.getPublicJob(slug ?? ""),
    enabled: Boolean(slug),
  });

  if (isLoading) return <div>Loading job...</div>;

  const job = (data as any)?.data?.item;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <div className="text-sm text-slate-500">
        {job.companyName} • {job.location}
      </div>
      <div
        className="mt-4 prose"
        dangerouslySetInnerHTML={{ __html: job.description ?? "" }}
      />
    </div>
  );
};

export default PublicJobDetailPage;
