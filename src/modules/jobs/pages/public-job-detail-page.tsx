import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import publicJobsApi from "../api/public-jobs.api";
import sanitizeHtml from "@/lib/sanitizeHtml";

const PublicJobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, error } = useQuery<any, any>({
    queryKey: ["public-job", slug],
    queryFn: () => publicJobsApi.getPublicJob(slug ?? ""),
    enabled: Boolean(slug),
    retry: false,
  });

  if (isLoading) return <div>Loading job...</div>;

  const status = error?.status ?? error?.response?.status;
  if (isError && status === 404) {
    return <div>Job not found</div>;
  }

  if (isError) {
    return <div>Unable to load job</div>;
  }

  const job = (data as any)?.data?.item;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <div className="text-sm text-slate-500">
        {job.companyName ?? "—"} • {job.location ?? "—"}
      </div>
      <div
        className="prose mt-4 max-w-none wrap-break-word"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(job.description ?? ""),
        }}
      />
    </div>
  );
};

export default PublicJobDetailPage;
