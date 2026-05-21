import { z } from "zod";

export const JobBase = z.object({
  title: z.string().min(3),
  shortDescription: z.string().max(255).optional(),
  description: z.string().optional(),
  companyId: z.string().optional(),
  employmentType: z
    .enum([
      "FULL_TIME",
      "PART_TIME",
      "CONTRACT",
      "INTERNSHIP",
      "TEMPORARY",
      "OTHER",
    ])
    .optional(),
  workMode: z.enum(["REMOTE", "ONSITE", "HYBRID"]).optional(),
  salaryFrom: z.number().int().nonnegative().optional(),
  salaryTo: z.number().int().nonnegative().optional(),
  skills: z.array(z.string()).optional(),
});

export const JobCreateSchema = JobBase.extend({});
export const JobUpdateSchema = JobBase.partial();

export type JobCreateInput = z.infer<typeof JobCreateSchema>;
export type JobUpdateInput = z.infer<typeof JobUpdateSchema>;

export default { JobCreateSchema, JobUpdateSchema };
