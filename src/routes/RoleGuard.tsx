import React from "react";
import { Navigate } from "react-router-dom";
import { getDefaultRouteByRole } from "../lib/apiUtils";
import useAuthStore from "../modules/auth/store/auth.store";
import type { Role } from "../modules/auth/types/user";

export const RoleGuard: React.FC<{
  allowed: Role[];
  children: React.ReactElement;
}> = ({ allowed, children }) => {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role)) {
    const fallback = getDefaultRouteByRole(user.role);
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug(
        "[RoleGuard] unauthorized, redirect to fallback",
        fallback,
        "userRole",
        user.role,
        "allowed",
        allowed,
      );
    }
    return <Navigate to={fallback} replace />;
  }
  return children;
};

export default RoleGuard;
