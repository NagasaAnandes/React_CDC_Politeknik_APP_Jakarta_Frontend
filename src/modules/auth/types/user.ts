export type Role =
  | "SUPER_ADMIN"
  | "COMPANY_ADMIN"
  | "COMPANY_STAFF"
  | "ALUMNI"
  | "STUDENT";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  companyId: number | null;
  isAlumni: boolean;
}
