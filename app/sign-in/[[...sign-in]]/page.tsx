import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { clerkReadyForEnvironment } from "../../../lib/clerk-runtime";

export default function AdminSignIn() {
  return <main id="main-content" style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f6f8fc", padding: 24 }}>
    {clerkReadyForEnvironment() ? <SignIn routing="path" path="/sign-in" forceRedirectUrl="/admin" /> :
      <section><h1>Admin sign-in is not active</h1><p>Production authentication requires Clerk production keys and a verified custom domain. Development keys cannot be used for the live website.</p><p>Until then, administrator access remains disabled. The public website is still available.</p><Link href="/">Return home</Link></section>}
  </main>;
}
