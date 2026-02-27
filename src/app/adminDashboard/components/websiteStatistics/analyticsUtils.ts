export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value || 0);
}

export function formatPercent(value: number): string {
  return `${Math.round(value || 0)}%`;
}

export function toSafeNumber(value: unknown): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

export function formatDate(date: string): string {
  const dt = new Date(date);
  if (Number.isNaN(dt.getTime())) return "N/A";
  return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export function formatDateTime(date: string): string {
  const dt = new Date(date);
  if (Number.isNaN(dt.getTime())) return "N/A";
  return dt.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
