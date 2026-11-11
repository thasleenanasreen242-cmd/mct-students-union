import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const withClerk = clerkMiddleware();
export default function middleware(request: Parameters<typeof withClerk>[0], event: Parameters<typeof withClerk>[1]) {
  if (!process.env.CLERK_SECRET_KEY || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return NextResponse.next();
  }
  return withClerk(request, event);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/sign-in/:path*"],
};
