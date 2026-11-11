import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { adminConfigured } from "../../lib/admin-access";
import AdminDashboard from "./AdminDashboard";
import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin dashboard", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!adminConfigured()) return <main id="main-content" className="admin-setup"><h1>Union administration</h1><p>Secure administration is waiting for Clerk and the designated Super Admin user ID to be configured in Vercel.</p><p>See <code>README_ADMIN.md</code> in the repository for the setup checklist.</p><Link href="/">← Return to website</Link></main>;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  if (userId !== process.env.SUPER_ADMIN_CLERK_USER_ID) return <main id="main-content" className="admin-setup"><h1>Access restricted</h1><p>This account is not the designated Super Admin. Please contact the site owner.</p><Link href="/">Return home</Link></main>;
  return <AdminDashboard />;
}
