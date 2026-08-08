export function formatScore(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value)}%`;
}

export function formatRate(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value)} tok/s`;
}

export function formatSeconds(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "—";
  if (value >= 90) {
    const minutes = Math.floor(value / 60);
    const seconds = Math.round(value % 60);
    return `${minutes}m ${seconds}s`;
  }
  return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value)}s`;
}

export function formatBytes(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const gigabyte = 1024 ** 3;
  const megabyte = 1024 ** 2;
  if (value >= gigabyte) return `${(value / gigabyte).toFixed(value >= 10 * gigabyte ? 1 : 2)} GB`;
  return `${Math.round(value / megabyte).toLocaleString()} MB`;
}

export function formatDate(value: Date | null | undefined, includeTime = true): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat(undefined, includeTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" }).format(value);
}

export function isPreliminary(submissionCount: number): boolean {
  return submissionCount < 3;
}

const APPLE_HARDWARE_NAMES: Record<string, string> = {
  "iPhone18,1": "iPhone 17 Pro",
};

export function formatHardwareModel(identifier: string): string {
  return APPLE_HARDWARE_NAMES[identifier] ?? identifier;
}
