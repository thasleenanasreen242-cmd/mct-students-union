export const transparencyMetrics = [
  { key: "received", label: "Issues received", icon: "scroll" },
  { key: "underReview", label: "Under review", icon: "scales" },
  { key: "resolved", label: "Resolved", icon: "shield" },
  { key: "forwarded", label: "Forwarded to authorities", icon: "landmark" },
  { key: "programmes", label: "Programmes conducted", icon: "calendar" },
  { key: "welfare", label: "Welfare initiatives", icon: "laurel" },
] as const;

export type TransparencyCounts = Record<(typeof transparencyMetrics)[number]["key"], number>;

export type ResolutionTarget = { days: number; resolvedWithinTarget: number };

export type TransparencyReport = {
  counts: TransparencyCounts;
  updatedAt: string;
  resolutionTarget?: ResolutionTarget;
};

// A reserved row in the existing content store. Only the transparency route edits it.
export const transparencyRecordId = "9531bc13-6352-42ff-8b18-df2b05142b31";
export const maxTransparencyCount = 999_999_999;

export function parseTransparencyCounts(input: unknown): TransparencyCounts | null {
  if (!input || typeof input !== "object") return null;
  const fields = input as Record<string, unknown>;
  const counts = {} as TransparencyCounts;

  for (const { key } of transparencyMetrics) {
    const value = fields[key];
    if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > maxTransparencyCount) return null;
    counts[key] = value;
  }

  if (counts.underReview > counts.received || counts.resolved > counts.received || counts.forwarded > counts.received) return null;
  return counts;
}

// Omitted target data is valid for older reports and when tracking is disabled.
export function parseResolutionTarget(input: unknown, resolved: number): ResolutionTarget | null {
  if (!input || typeof input !== "object") return null;
  const { days, resolvedWithinTarget } = input as Record<string, unknown>;
  if (typeof days !== "number" || !Number.isInteger(days) || days < 1 || days > 365) return null;
  if (
    typeof resolvedWithinTarget !== "number" ||
    !Number.isInteger(resolvedWithinTarget) ||
    resolvedWithinTarget < 0 ||
    resolvedWithinTarget > resolved
  ) return null;
  return { days, resolvedWithinTarget };
}

export function readTransparencyReport(row: { body: string } | undefined): TransparencyReport | null {
  if (!row) return null;
  const stored: Partial<TransparencyReport> | null = JSON.parse(row.body);
  const counts = parseTransparencyCounts(stored?.counts);
  const updatedAt = stored?.updatedAt;
  if (!counts || typeof updatedAt !== "string" || !Number.isFinite(Date.parse(updatedAt))) return null;
  const resolutionTarget = parseResolutionTarget(stored?.resolutionTarget, counts.resolved);
  return resolutionTarget ? { counts, updatedAt, resolutionTarget } : { counts, updatedAt };
}
