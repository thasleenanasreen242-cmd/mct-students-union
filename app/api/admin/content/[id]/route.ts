import { adminApiGuard } from "../../../../../lib/admin-access";
import { database, validKind } from "../../../../../lib/union-content";

export const runtime = "nodejs";
type Params = { params: Promise<{ id: string }> };
const isUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export async function PATCH(request: Request, { params }: Params) {
  const denial = await adminApiGuard(); if (denial) return denial;
  const { id } = await params;
  if (!isUuid(id)) return Response.json({ error: "Invalid ID" }, { status: 400 });
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!validKind(data.kind) || typeof data.title !== "string" || !data.title.trim() || data.title.length > 200 || !["draft", "published", "archived"].includes(String(data.status))) {
    return Response.json({ error: "Invalid type, title or status" }, { status: 400 });
  }
  const str = (key: string, max: number) => typeof data[key] === "string" ? String(data[key]).slice(0,max) : "";
  const date = (key: string) => typeof data[key] === "string" && data[key] && !Number.isNaN(Date.parse(String(data[key]))) ? new Date(String(data[key])).toISOString() : null;
  try {
    const rows = await database()`UPDATE union_content SET kind=${data.kind}, title=${data.title.trim()},
      summary=${str("summary",1000)}, body=${str("body",20000)}, status=${data.status}, pinned=${data.pinned === true},
      starts_at=${date("starts_at")}, ends_at=${date("ends_at")}, expires_at=${date("expires_at")},
      category=${str("category",100)},role=${str("role",100)},media_url=${str("media_url",2000) || null},media_type=${str("media_type",80) || null},updated_at=now()
      WHERE id=${id} RETURNING *`;
    if (!rows.length) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ item: rows[0] });
  } catch { return Response.json({ error: "Could not update content" }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: Params) {
  const denial = await adminApiGuard(); if (denial) return denial;
  const { id } = await params;
  if (!isUuid(id)) return Response.json({ error: "Invalid ID" }, { status: 400 });
  try {
    const rows = await database()`DELETE FROM union_content WHERE id=${id} RETURNING id`;
    return Response.json({ deleted: rows.length > 0 });
  } catch { return Response.json({ error: "Could not delete content" }, { status: 500 }); }
}
