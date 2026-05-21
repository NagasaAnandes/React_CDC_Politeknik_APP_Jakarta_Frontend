export const JOB_STATUSES = [
  "DRAFT",
  "PENDING_APPROVAL",
  "APPROVED",
  "REJECTED",
  "PUBLISHED",
  "ARCHIVED",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];
