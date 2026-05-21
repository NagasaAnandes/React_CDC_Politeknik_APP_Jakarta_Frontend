export const formatSalary = (from?: number | null, to?: number | null) => {
  if (!from && !to) return "—";
  if (from && !to) return `Rp ${from.toLocaleString()}`;
  if (!from && to) return `Rp ${to.toLocaleString()}`;
  return `Rp ${from!.toLocaleString()} - Rp ${to!.toLocaleString()}`;
};
