import React from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout: React.FC = () => {
  return (
    <div>
      <header className="p-4 border-b">Admin Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
