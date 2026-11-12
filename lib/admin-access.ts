import { auth } from "@clerk/nextjs/server";
import { clerkReadyForEnvironment } from "./clerk-runtime";

export function adminConfigured() {
  return clerkReadyForEnvironment() && Boolean(process.env.SUPER_ADMIN_CLERK_USER_ID?.trim());
}

export async function isSuperAdmin() {
  if (!adminConfigured()) return false;
  const { userId } = await auth();
  return Boolean(userId && userId === process.env.SUPER_ADMIN_CLERK_USER_ID?.trim());
}

export async function adminApiGuard(): Promise<Response | null> {
  if (!adminConfigured()) return Response.json({ error: "Administration is not configured for this environment" }, { status: 503 });
  if (!(await isSuperAdmin())) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!process.env.DATABASE_URL) return Response.json({ error: "Database is not configured" }, { status: 503 });
  return null;
}
