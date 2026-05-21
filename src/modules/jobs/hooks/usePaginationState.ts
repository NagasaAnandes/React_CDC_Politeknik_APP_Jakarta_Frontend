import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const usePaginationState = (defaults = { skip: 0, take: 20 }) => {
  const [search, setSearch] = useSearchParams();

  const skip = useMemo(() => {
    const s = Number(search.get("skip") ?? defaults.skip);
    return Number.isNaN(s) ? defaults.skip : s;
  }, [search, defaults.skip]);

  const take = useMemo(() => {
    const t = Number(search.get("take") ?? defaults.take);
    return Number.isNaN(t) ? defaults.take : t;
  }, [search, defaults.take]);

  const setPagination = (next: { skip?: number; take?: number }) => {
    const nextParams = new URLSearchParams(search.toString());
    if (typeof next.skip === "number")
      nextParams.set("skip", String(next.skip));
    if (typeof next.take === "number")
      nextParams.set("take", String(next.take));
    setSearch(nextParams);
  };

  return { skip, take, setPagination } as const;
};

export default usePaginationState;
