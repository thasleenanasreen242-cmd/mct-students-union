import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminSignIn() {
  return <main id="main-content" style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f6f8fc", padding: 24 }}>
    {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? <SignIn routing="path" path="/sign-in" forceRedirectUrl="/admin" /> :
      <section><h1>Admin sign-in is not configured</h1><p>Connect Clerk in Vercel to enable the login.</p><Link href="/">Return home</Link></section>}
  </main>;
}
