import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkReadyForEnvironment } from "./lib/clerk-runtime";

const withClerk = clerkMiddleware();

export default function middleware(request: Parameters<typeof withClerk>[0], event: Parameters<typeof withClerk>[1]) {
  // Never execute a development Clerk handshake on the production Vercel domain.
  if (!clerkReadyForEnvironment()) return NextResponse.next();
  return withClerk(request, event);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/sign-in/:path*"],
};
