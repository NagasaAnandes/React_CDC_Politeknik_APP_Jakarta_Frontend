import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum([
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "COMPANY_STAFF",
    "ALUMNI",
    "STUDENT",
  ]),
  companyId: z.number().nullable(),
  isAlumni: z.boolean(),
});

export const authDataSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});

export const authResponseSchema = z.object({
  success: z.boolean(),
  data: authDataSchema,
});
