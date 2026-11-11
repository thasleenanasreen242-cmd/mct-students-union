# MCT Students' Union — Secure Admin Setup

This project includes a live content-management dashboard at `/admin` for a **single designated Super Admin**. It uses Clerk (authentication), Neon Postgres (content records), and Vercel Blob (public PDFs and images). Unconfigured deployments deny admin access. No API credential belongs in source code or public chat.

## 1. Connect the three services to the existing Vercel project

In Vercel: `brandpilot` → `mct-students-union` → **Storage / Marketplace / Integrations**:

1. Install **Clerk** and link it to this Vercel project. Create a Clerk application and turn off public sign-up/registration in Clerk's dashboard (invitation-only). Enable MFA for the Super Admin account.
2. Install **Neon Postgres** from the Vercel Marketplace and connect its production database to this project.
3. Under **Storage**, create a **Vercel Blob** store with **public** access and connect it to the project. Uploaded site resources are intentionally public. Do not upload student records or confidential case materials.

Each integration normally injects environment variables for the connected project. In **Settings → Environment Variables**, confirm:

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public (Clerk-generated) | Clerk client authentication |
| `CLERK_SECRET_KEY` | Secret, server only | Clerk session verification |
| `SUPER_ADMIN_CLERK_USER_ID` | Secret, server only | Exact one-person allowlist, e.g. `user_...` |
| `DATABASE_URL` | Secret, server only | Neon pooled Postgres connection string |
| `BLOB_READ_WRITE_TOKEN` | Secret, server only | Upload files to Vercel Blob |

Optional: `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`. Do not prefix secret variables with `NEXT_PUBLIC_`. Apply these variables to **Production** and to Preview only if you need a separate staging configuration. After adding or changing variables, redeploy.

## 2. Create the Super Admin

In Clerk dashboard → **Users**, create or invite the account that will be the Super Admin. Copy the account's **Clerk User ID** (not the email address), and enter it as `SUPER_ADMIN_CLERK_USER_ID` in the Vercel project. Only this ID is allowed into the dashboard or its write APIs. Authentication alone does not grant access. For best security, disable public registration and enable MFA in Clerk.

## 3. Initialize Neon tables

Open the connected Neon project → SQL Editor, select the correct production database, and run the contents of [`db/admin-schema.sql`](db/admin-schema.sql) once. The SQL creates `union_content` and its indexes. It is idempotent. Keep the connection URL in Vercel, not in the repo.

## 4. Redeploy and verify

Push to GitHub `main` (Vercel auto-builds), or click **Redeploy** in Vercel after the integrations are configured. Visit `/sign-in`, log in as the designated user, then open `/admin`.

Smoke test:

1. Create a draft notice. It should not appear publicly.
2. Publish it. It should appear on the home noticeboard and `/notices`.
3. Set an expiry in the past. It should disappear publicly but remain in admin with `Expired` status.
4. Upload a small PDF through Library PDFs and publish it. Check `/library` and the download link.
5. Publish one event, activity/photo, and office-bearer; check the corresponding public pages.
6. Sign out; `/api/admin/content` should return 403 and never return records. An authenticated but non-allowlisted Clerk user must also be refused.

## Security and limits

- All mutations are authenticated server-side and checked against the exact `SUPER_ADMIN_CLERK_USER_ID` before database/Blob access.
- Drafts, archived items, and expired items are not returned to public pages. Admin read/write routes are not publicly accessible.
- File uploads accept validated PDF/JPEG/PNG/WebP signatures, with a maximum 10 MB per upload. Blob URLs are **public**; do not store sensitive documents.
- Published content is plain text in React components (automatically escaped). Public links have safe external-tab attributes.
- Content entries are currently restricted to 500 records in the admin list, 100 per public type. For a large collection, add pagination later.
- Current editor attaches **one file per record**; for an album, create multiple activity records. Physical Blob deletion is intentionally not exposed in the dashboard to avoid accidental irreversible deletion.
- This is a public-content CMS, **not** a grievance case-management system; complaints/student identities are excluded from this build.
