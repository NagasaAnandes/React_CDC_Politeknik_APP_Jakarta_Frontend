import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import AppQueryProvider from "./app/providers/QueryProvider";
import { Toaster } from "sonner";
import useAuthStore from "./modules/auth/store/auth.store";

const Root: React.FC = () => {
  const isHydrated = useAuthStore((s: { isHydrated: boolean }) => s.isHydrated);
  // Don't render app until auth hydration finished to avoid flicker
  if (!isHydrated) return null;

  return (
    <StrictMode>
      <AppQueryProvider>
        <AppRouter />
        <Toaster position="top-right" richColors />
      </AppQueryProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
