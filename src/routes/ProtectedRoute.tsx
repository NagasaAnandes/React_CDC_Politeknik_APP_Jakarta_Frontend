import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../modules/auth/store/auth.store";

export const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isHydrated) return null; // avoid flicker
  if (!isAuthenticated) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug(
        "[ProtectedRoute] unauthenticated, redirecting to /login",
        location.pathname,
      );
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
