import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { clerkReadyForEnvironment } from "../../../lib/clerk-runtime";

export const dynamic = "force-dynamic";

export default function AdminSignIn() {
  const preview = process.env.VERCEL_ENV === "preview";
  const needsSetup = !clerkReadyForEnvironment();
  const settingsToCheck = preview && needsSetup ? [
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim().startsWith("pk_test_") &&
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY should contain the Clerk Development publishable key.",
    !process.env.CLERK_SECRET_KEY?.trim().startsWith("sk_test_") &&
      "CLERK_SECRET_KEY should contain the Clerk Development secret key from the same instance.",
  ].filter(Boolean) : [];

  return (
    <main id="main-content" style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f6f8fc", padding: 24 }}>
      {needsSetup ? (
        <section>
          <h1>Admin sign-in is not active</h1>
          {preview ? (
            <>
              <p>Check the Clerk Development keys in Vercel for the Preview environment and this branch.</p>
              {settingsToCheck.length > 0 && <ul>{settingsToCheck.map(setting => <li key={String(setting)}>{setting}</li>)}</ul>}
              <p>Redeploy the Preview after saving changes.</p>
            </>
          ) : (
            <p>For the live site, configure Clerk production keys and a verified custom domain. For a Preview deployment, enable Vercel system environment variables and configure the Clerk Development keys for Preview.</p>
          )}
          <Link href="/">Return home</Link>
        </section>
      ) : (
        <SignIn routing="path" path="/sign-in" forceRedirectUrl="/admin" />
      )}
    </main>
  );
}
