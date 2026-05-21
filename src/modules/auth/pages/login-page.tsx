import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/auth.api";
import useAuthStore from "../store/auth.store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  extractApiErrorMessage,
  getDefaultRouteByRole,
} from "../../../lib/apiUtils";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (vals: FormValues) => loginApi(vals),
    onError: (err: any) => {
      const message = extractApiErrorMessage(err) || "Login failed";
      toast.error(message);
    },
    onSuccess: (data) => {
      // data: { accessToken, user }
      setAuth(data.user, data.accessToken);
      toast.success("Login successful");
      // centralized role-based redirect
      const route = getDefaultRouteByRole(data.user.role);
      navigate(route);
    },
  });

  const onSubmit = (vals: FormValues) => mutation.mutate(vals);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
