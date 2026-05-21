import { useMemo } from "react";
import { useQueryState } from "./useQueryState";
import type { EmploymentType, WorkMode } from "../types";

export const useJobFilters = () => {
  const qs = useQueryState();

  const q = qs.get("q") ?? "";
  const employment =
    (qs.get("employment") as EmploymentType | undefined) ?? undefined;
  const workMode = (qs.get("workMode") as WorkMode | undefined) ?? undefined;

  const setSearch = (value?: string) => qs.set("q", value ?? null);
  const setEmployment = (value?: EmploymentType) =>
    qs.set("employment", value ?? null);
  const setWorkMode = (value?: WorkMode) => qs.set("workMode", value ?? null);

  const toParams = useMemo(() => {
    const p: Record<string, string | number | undefined> = {};
    if (q) p.q = q;
    if (employment) p.employment = employment;
    if (workMode) p.workMode = workMode;
    return p;
  }, [q, employment, workMode]);

  return {
    q,
    employment,
    workMode,
    setSearch,
    setEmployment,
    setWorkMode,
    toParams,
  } as const;
};

export default useJobFilters;
