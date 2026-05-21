import api from "@/services/api";

const BASE = "/jobs";

export const applyToJob = async (
  jobId: string,
  payload: { coverLetter?: string; resumeId?: string },
) => {
  const res = await api.post(`${BASE}/${jobId}/applications`, payload);
  return res.data;
};

export const listApplications = async (
  jobId: string,
  params?: { skip?: number; take?: number },
) => {
  const res = await api.get(`${BASE}/${jobId}/applications`, { params });
  return res.data;
};

export default { applyToJob, listApplications };
