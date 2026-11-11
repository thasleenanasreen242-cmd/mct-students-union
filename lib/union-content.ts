import { neon } from "@neondatabase/serverless";

export const kinds = ["notice", "library", "event", "activity", "office_bearer"] as const;
export type ContentKind = (typeof kinds)[number];
export type ContentStatus = "draft" | "published" | "archived";
export type UnionItem = {
  id: string; kind: ContentKind; title: string; summary: string; body: string;
  status: ContentStatus; pinned: boolean; starts_at: string | null;
  ends_at: string | null; expires_at: string | null; category: string;
  role: string; media_url: string | null; media_type: string | null;
  created_at: string; updated_at: string;
};

export function database() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return neon(process.env.DATABASE_URL);
}

export async function publicItems(kind: ContentKind): Promise<UnionItem[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const sql = database();
    const rows = await sql`SELECT * FROM union_content WHERE kind = ${kind} AND status = 'published'
      AND (expires_at IS NULL OR expires_at > now())
      ORDER BY pinned DESC, starts_at DESC NULLS LAST, created_at DESC LIMIT 100`;
    return rows as UnionItem[];
  } catch (error) {
    console.error("Unable to load public Union content", error);
    return [];
  }
}

export function validKind(value: unknown): value is ContentKind {
  return typeof value === "string" && kinds.includes(value as ContentKind);
}
