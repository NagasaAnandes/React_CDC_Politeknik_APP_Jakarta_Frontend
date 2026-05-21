import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import AppQueryProvider from "./app/providers/QueryProvider";
import AppErrorBoundary from "./components/AppErrorBoundary";
import { Toaster } from "sonner";
import useAuthStore from "./modules/auth/store/auth.store";

const Root: React.FC = () => {
  const isHydrated = useAuthStore((s: { isHydrated: boolean }) => s.isHydrated);
  // Don't render app until auth hydration finished to avoid flicker
  if (!isHydrated) return null;

  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppQueryProvider>
          <AppRouter />
          <Toaster position="top-right" richColors />
        </AppQueryProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
};

const container = document.getElementById("root")!;
const __ROOT_KEY = "__react_root__";

if (!(window as any)[__ROOT_KEY]) {
  (window as any)[__ROOT_KEY] = createRoot(container);
}

(window as any)[__ROOT_KEY].render(<Root />);
