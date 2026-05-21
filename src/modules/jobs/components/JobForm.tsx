import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobCreateSchema } from "../schemas/job.schema";
import type { JobCreateInput } from "../schemas/job.schema";

export const JobForm: React.FC<{
  defaultValues?: Partial<JobCreateInput>;
  onSubmit: (values: JobCreateInput) => void | Promise<void>;
}> = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, formState } = useForm<JobCreateInput>({
    resolver: zodResolver(JobCreateSchema),
    defaultValues: defaultValues as any,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input {...register("title")} className="input w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Short description</label>
        <input {...register("shortDescription")} className="input w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea {...register("description")} className="textarea w-full" />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
