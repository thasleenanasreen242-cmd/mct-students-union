import { adminApiGuard } from "../../../../lib/admin-access";
import {
  parseResolutionTarget,
  parseTransparencyCounts,
  readTransparencyReport,
  transparencyRecordId,
} from "../../../../lib/transparency";
import { database } from "../../../../lib/union-content";

export const runtime = "nodejs";

export async function GET() {
  const denial = await adminApiGuard();
  if (denial) return denial;

  try {
    const rows = await database()`SELECT body FROM union_content WHERE id = ${transparencyRecordId}`;
    return Response.json({ report: readTransparencyReport(rows[0] as { body: string } | undefined) });
  } catch {
    return Response.json({ error: "Could not load the transparency figures." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const denial = await adminApiGuard();
  if (denial) return denial;

  const data = await request.json().catch(() => null);
  const counts = parseTransparencyCounts(data?.counts ?? data);
  if (!counts) {
    return Response.json({
      error: "Enter valid whole numbers. Under review, resolved and forwarded must each be no greater than issues received.",
    }, { status: 400 });
  }

  const resolutionTarget = parseResolutionTarget(data?.resolutionTarget, counts.resolved);
  if (data?.resolutionTarget != null && !resolutionTarget) {
    return Response.json({
      error: "Enter a target from 1 to 365 days and a whole number within target no greater than the total resolved.",
    }, { status: 400 });
  }

  const report = { counts, updatedAt: new Date().toISOString(), resolutionTarget };
  try {
    const rows = await database()`INSERT INTO union_content (id, kind, title, body, status)
      VALUES (${transparencyRecordId}, 'notice', 'Transparency figures', ${JSON.stringify(report)}, 'published')
      ON CONFLICT (id) DO UPDATE SET body = EXCLUDED.body, status = 'published', updated_at = now()
      RETURNING body`;
    return Response.json({ report: readTransparencyReport(rows[0] as { body: string }) });
  } catch {
    return Response.json({ error: "Could not publish the transparency figures." }, { status: 500 });
  }
}
