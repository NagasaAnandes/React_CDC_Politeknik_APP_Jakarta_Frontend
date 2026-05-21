import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";
import { me as meApi } from "../api/auth.api";
import { clearAccessToken, setAccessToken } from "../lib/token";
import { onUnauthorized } from "../lib/auth-events";
import { ZodError } from "zod";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setAuth: (user: User | null, token: string | null) => void;
  hydrate: () => void;
  initialize: () => Promise<void>;
};

const syncAuthState = (
  set: (partial: Partial<AuthState>) => void,
  user: User | null,
  token: string | null,
) => {
  set({
    user,
    token,
    isAuthenticated: Boolean(user && token),
  });
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,
      login: (user, token) => {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.debug("[auth] login", user?.email ?? user?.id);
        }
        setAccessToken(token);
        syncAuthState(set, user, token);
      },
      logout: () => {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.debug("[auth] logout");
        }
        clearAccessToken();
        syncAuthState(set, null, null);
      },
      setAuth: (user, token) => {
        if (token) {
          setAccessToken(token);
        } else {
          clearAccessToken();
        }
        syncAuthState(set, user, token);
      },
      hydrate: () => {
        set(() => ({ isHydrated: true }));
      },
      initialize: async () => {
        const state = get();
        const token = state.token;
        if (!token) {
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.debug("[auth] initialize: no token, marking hydrated");
          }
          clearAccessToken();
          set(() => ({ isHydrated: true }));
          return;
        }
        try {
          setAccessToken(token);
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.debug("[auth] initialize: validating token");
          }
          const data = await meApi();
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.debug(
              "[auth] initialize: token valid",
              data.user?.email ?? data.user?.id,
            );
          }
          syncAuthState(set, data.user, token);
        } catch (e: any) {
          const status = e?.status ?? e?.response?.status;
          const isMalformedAuthResponse = e instanceof ZodError;
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.debug(
              "[auth] initialize: token validation error",
              status,
              e,
            );
          }
          if (status === 401 || status === 403 || isMalformedAuthResponse) {
            clearAccessToken();
            syncAuthState(set, null, null);
          }
        } finally {
          const current = get();
          syncAuthState(set, current.user, current.token);
          set(() => ({ isHydrated: true }));
        }
      },
    }),
    {
      name: "cdc_auth",
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        // when rehydration finishes, validate token and initialize auth
        setTimeout(() => {
          try {
            setAccessToken(state?.token ?? null);
            useAuthStore.getState().initialize();
          } catch (e) {
            try {
              useAuthStore.getState().hydrate();
            } catch (er) {
              // noop
            }
          }
        }, 0);
      },
    },
  ),
);

if (typeof window !== "undefined") {
  onUnauthorized(() => {
    useAuthStore.getState().logout();
  });
}

export default useAuthStore;
