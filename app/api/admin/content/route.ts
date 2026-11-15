import { transparencyRecordId } from "../../../../lib/transparency";
import { adminApiGuard } from "../../../../lib/admin-access";
import { database, validKind } from "../../../../lib/union-content";

export const runtime = "nodejs";

export async function GET() {
  const denial = await adminApiGuard();
  if (denial) return denial;
  try {
    const rows = await database()`SELECT * FROM union_content WHERE id <> ${transparencyRecordId} ORDER BY updated_at DESC LIMIT 500`;
    return Response.json({ items: rows });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
    const message = code === "42P01"
      ? "The admin database is missing the union_content table. Check which Neon branch DATABASE_URL points to."
      : code === "42501"
        ? "The admin database role cannot read union_content. Check that Preview DATABASE_URL uses the dashboard's editor role."
        : code === "28P01" || code === "28000"
          ? "The admin database rejected the login. Check the Preview DATABASE_URL credentials."
          : code === "3D000"
            ? "The database named in Preview DATABASE_URL does not exist."
            : "Unable to read content from the admin database. Check the Preview database connection.";
    console.error("Admin database read failed", typeof code === "string" && /^[0-9A-Z]{5}$/.test(code) ? code : "unknown");
    return Response.json({ error: message }, { status: 500 });
  }
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
