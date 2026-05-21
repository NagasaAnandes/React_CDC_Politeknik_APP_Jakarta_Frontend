import React from "react";
import { Outlet } from "react-router-dom";

export const StudentLayout: React.FC = () => {
  return (
    <div>
      <header className="p-4 border-b">App Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
