import api from "@/services/api";
import type { JobsListResponse, JobDetail, JobListItem } from "../types";

const BASE = "/public/jobs";

export const listPublicJobs = async (params?: {
  skip?: number;
  take?: number;
  q?: string;
}) => {
  const res = await api.get(BASE, { params });
  return res.data as { success: true; data: JobsListResponse<JobListItem> };
};

export const getPublicJob = async (slug: string) => {
  const res = await api.get(`${BASE}/${slug}`);
  return res.data as { success: true; data: { item: JobDetail } };
};

export default { listPublicJobs, getPublicJob };
