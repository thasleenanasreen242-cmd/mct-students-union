import { neon } from "@neondatabase/serverless";
import { database } from "./union-content";
import { readTransparencyReport, transparencyRecordId } from "./transparency";

export async function publishedTransparency() {
  try {
    const readerUrl = process.env.PUBLISHED_CONTENT_DATABASE_URL;
    if (!readerUrl && !process.env.DATABASE_URL) return null;
    const rows = readerUrl
      ? await neon(readerUrl)`SELECT body FROM public.union_published_content WHERE id = ${transparencyRecordId}`
      : await database()`SELECT body FROM union_content WHERE id = ${transparencyRecordId} AND status = 'published'
          AND (expires_at IS NULL OR expires_at > now())`;
    return readTransparencyReport(rows[0] as { body: string } | undefined);
  } catch {
    console.error("Unable to load published transparency figures");
    return null;
  }
}
