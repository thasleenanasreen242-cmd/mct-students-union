import { put } from "@vercel/blob";
import { adminApiGuard } from "../../../../lib/admin-access";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denial = await adminApiGuard(); if (denial) return denial;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: "Vercel Blob is not connected" }, { status: 503 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Select a file" }, { status: 400 });
  const valid = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
  if (!valid.includes(file.type)) return Response.json({ error: "Only PDF, JPEG, PNG and WebP files are allowed" }, { status: 415 });
  if (file.size < 1 || file.size > 10 * 1024 * 1024) return Response.json({ error: "File must be 10 MB or smaller" }, { status: 413 });
  const signature = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const pdf = [37,80,68,70,45].every((n,i) => signature[i] === n);
  const jpg = signature[0] === 255 && signature[1] === 216 && signature[2] === 255;
  const png = [137,80,78,71,13,10,26,10].every((n,i) => signature[i] === n);
  const webp = String.fromCharCode(...signature).startsWith("RIFF") && String.fromCharCode(...signature.slice(8,12)) === "WEBP";
  if (!(file.type === "application/pdf" && pdf || file.type === "image/jpeg" && jpg || file.type === "image/png" && png || file.type === "image/webp" && webp)) {
    return Response.json({ error: "File contents do not match the selected format" }, { status: 415 });
  }
  const cleanName = file.name.replace(/[^a-z0-9._-]/gi, "-").slice(-80);
  try {
    const blob = await put(`union/${crypto.randomUUID()}-${cleanName}`, file, { access: "public", addRandomSuffix: false, contentType: file.type });
    return Response.json({ url: blob.url, type: file.type });
  } catch { return Response.json({ error: "Upload failed" }, { status: 500 }); }
}
