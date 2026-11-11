import { adminApiGuard } from "../../../../lib/admin-access";
import { database, validKind } from "../../../../lib/union-content";

export const runtime = "nodejs";

export async function GET() {
  const denial = await adminApiGuard();
  if (denial) return denial;
  try {
    const rows = await database()`SELECT * FROM union_content ORDER BY updated_at DESC LIMIT 500`;
    return Response.json({ items: rows });
  } catch { return Response.json({ error: "Unable to read content. Check the Neon schema." }, { status: 500 }); }
}

export async function POST(request: Request) {
  const denial = await adminApiGuard();
  if (denial) return denial;
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!validKind(data.kind) || typeof data.title !== "string" || !data.title.trim() || data.title.length > 200) {
    return Response.json({ error: "A valid type and title (1–200 characters) are required" }, { status: 400 });
  }
  const status = data.status === "published" ? "published" : "draft";
  const str = (key: string, max: number) => typeof data[key] === "string" ? String(data[key]).slice(0, max) : "";
  const date = (key: string) => typeof data[key] === "string" && data[key] && !Number.isNaN(Date.parse(String(data[key]))) ? new Date(String(data[key])).toISOString() : null;
  try {
    const rows = await database()`INSERT INTO union_content (kind,title,summary,body,status,pinned,starts_at,ends_at,expires_at,category,role,media_url,media_type)
      VALUES (${data.kind},${data.title.trim()},${str("summary",1000)},${str("body",20000)},${status},${data.pinned === true},
      ${date("starts_at")},${date("ends_at")},${date("expires_at")},${str("category",100)},${str("role",100)},${str("media_url",2000) || null},${str("media_type",80) || null}) RETURNING *`;
    return Response.json({ item: rows[0] }, { status: 201 });
  } catch { return Response.json({ error: "Could not create content" }, { status: 500 }); }
}
