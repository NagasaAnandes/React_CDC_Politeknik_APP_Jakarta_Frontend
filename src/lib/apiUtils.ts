import type { Role } from "../modules/auth/types/user";

export const extractApiErrorMessage = (err: any): string => {
  if (!err) return "Unknown error";
  // axios normalized shape: { status, data, message }
  if (typeof err === "string") return err;
  if (err?.data?.message) return String(err.data.message);
  if (err?.message) return String(err.message);
  if (err?.status) return `Request failed (${err.status})`;
  return "Unknown error";
};

export const getDefaultRouteByRole = (role?: Role | null): string => {
  switch (role) {
    case "SUPER_ADMIN":
      return "/admin";
    case "COMPANY_ADMIN":
    case "COMPANY_STAFF":
      return "/company";
    case "ALUMNI":
    case "STUDENT":
      return "/app";
    default:
      return "/";
  }
};

export default {
  extractApiErrorMessage,
  getDefaultRouteByRole,
};
