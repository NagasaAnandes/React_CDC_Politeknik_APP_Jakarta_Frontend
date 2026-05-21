import api from "@/services/api";
import type { JobsListResponse, JobDetail, JobListItem } from "../types";

const BASE = "/jobs";

export const listJobs = async (params?: {
  skip?: number;
  take?: number;
  q?: string;
}) => {
  const res = await api.get(BASE, { params });
  return res.data as { success: true; data: JobsListResponse<JobListItem> };
};

export const getJob = async (id: string) => {
  const res = await api.get(`${BASE}/${id}`);
  return res.data as { success: true; data: { item: JobDetail } };
};

export const createJob = async (payload: Partial<JobDetail>) => {
  const res = await api.post(BASE, payload);
  return res.data as { success: true; data: { item: JobDetail } };
};

export const updateJob = async (id: string, payload: Partial<JobDetail>) => {
  const res = await api.patch(`${BASE}/${id}`, payload);
  return res.data as { success: true; data: { item: JobDetail } };
};

export const deleteJob = async (id: string) => {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data as { success: true };
};

export default {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
