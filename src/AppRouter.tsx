import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import CompanyLayout from "./layouts/CompanyLayout";
import StudentLayout from "./layouts/StudentLayout";
import { LoginPage } from "./modules/auth/pages/login-page";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleGuard from "./routes/RoleGuard";
import RouteLogger from "./components/RouteLogger";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouteLogger />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<div className="p-4">Public Landing</div>} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <RoleGuard allowed={["SUPER_ADMIN"] as any}>
                <AdminLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<div>Admin Dashboard</div>} />
        </Route>

        <Route
          path="/company/*"
          element={
            <ProtectedRoute>
              <RoleGuard allowed={["COMPANY_ADMIN", "COMPANY_STAFF"] as any}>
                <CompanyLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<div>Company Dashboard</div>} />
        </Route>

        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <RoleGuard allowed={["ALUMNI", "STUDENT"] as any}>
                <StudentLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<div>App Dashboard</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
