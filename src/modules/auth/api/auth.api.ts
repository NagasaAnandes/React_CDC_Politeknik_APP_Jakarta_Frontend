import api from "../../../services/api";
import { authResponseSchema } from "../schemas/auth.schema";

type LoginCredentials = { email: string; password: string };

export const login = async (payload: LoginCredentials) => {
  const response = await api.post("/auth/login", payload);
  const parsed = authResponseSchema.parse(response.data);
  return parsed.data;
};

export const me = async () => {
  const response = await api.get("/auth/me");
  const parsed = authResponseSchema.parse(response.data);
  return parsed.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
