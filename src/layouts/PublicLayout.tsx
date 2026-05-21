import React from "react";
import { Outlet } from "react-router-dom";

export const PublicLayout: React.FC = () => {
  return (
    <div>
      <header className="p-4 border-b">Public Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
