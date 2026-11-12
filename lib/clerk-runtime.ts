/**
 * Keep production fail-closed when the site has development (pk_test/sk_test)
 * keys. Never try to complete a Clerk development handshake on the public
 * Vercel domain. Preview and local environments may use matching test keys.
 */
export function clerkReadyForEnvironment(): boolean {
  const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ?? "";
  const secret = process.env.CLERK_SECRET_KEY?.trim() ?? "";
  const testPair = publishable.startsWith("pk_test_") && secret.startsWith("sk_test_");
  const livePair = publishable.startsWith("pk_live_") && secret.startsWith("sk_live_");
  const isProduction = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV;
  return isProduction ? livePair : (testPair || livePair);
}
