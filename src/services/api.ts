import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { extractApiErrorMessage } from "../lib/apiUtils";
import { emitUnauthorized } from "../modules/auth/lib/auth-events";
import { getAccessToken } from "../modules/auth/lib/token";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

export const createAPI = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request interceptor: inject token if available via getter
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug(
        "[api] request",
        config.method,
        config.url,
        "hasAuth",
        Boolean(config.headers?.Authorization),
      );
    }
    return config;
  });

  // Response interceptor: normalize and handle errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // preserve raw AxiosResponse; parsing belongs in API layer
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug(
          "[api] response",
          response.config.method,
          response.config.url,
          response.status,
          response.data,
        );
      }
      return response;
    },
    (error: AxiosError) => {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(
          "[api] response error",
          error.config?.method,
          error.config?.url,
          error,
        );
      }
      const status = error.response?.status;
      const data = error.response?.data;
      const message =
        extractApiErrorMessage({
          status,
          data,
          message: error.message,
        }) ?? error.message;

      if (error.response) {
        if (status === 401) {
          emitUnauthorized();
        }

        return Promise.reject({
          status,
          message,
          data,
        });
      }
      return Promise.reject({
        status: undefined,
        message,
        data: undefined,
      });
    },
  );

  return instance;
};

const api = createAPI();
export default api;
