import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryState = () => {
  const [search, setSearch] = useSearchParams();

  const get = useCallback(
    (key: string, fallback?: string) => {
      return search.get(key) ?? fallback ?? undefined;
    },
    [search],
  );

  const set = useCallback(
    (key: string, value?: string | number | null) => {
      const params = new URLSearchParams(search.toString());
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
      setSearch(params);
    },
    [search, setSearch],
  );

  return { get, set, raw: search } as const;
};

export default useQueryState;
