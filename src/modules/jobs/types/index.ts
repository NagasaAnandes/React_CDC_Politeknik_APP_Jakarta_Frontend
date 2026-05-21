export type ID = string;

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "TEMPORARY"
  | "OTHER";
export type WorkMode = "REMOTE" | "ONSITE" | "HYBRID";

export type ApprovalStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "PUBLISHED"
  | "ARCHIVED";

export type JobPagination = {
  skip: number;
  take: number;
  total: number;
};

export type JobListItem = {
  id: ID;
  title: string;
  slug?: string;
  companyId?: ID;
  companyName?: string;
  location?: string;
  employmentType?: EmploymentType;
  workMode?: WorkMode;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  approvalStatus?: ApprovalStatus;
  published?: boolean;
  shortDescription?: string;
  createdAt?: string;
};

export type JobDetail = JobListItem & {
  description?: string;
  requirements?: string[];
  benefits?: string[];
  skills?: string[];
  responsibilities?: string[];
  updatedAt?: string;
};

export type Job = JobDetail;

export type JobsListResponse<T = JobListItem> = {
  items: T[];
  pagination: JobPagination;
};
