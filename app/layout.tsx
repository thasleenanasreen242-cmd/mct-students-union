import type { Metadata } from "next";
import "./globals.css";
import "./premium-type.css";
import "./modern-refresh.css";
import MCTChatBot from "./components/MCTChatBot";

export const metadata: Metadata = {
  metadataBase: new URL("https://mct-students-union.vercel.app"),
  title: { default: "MCT Students’ Union | Student Hub, Law Resources & Support", template: "%s | MCT Students’ Union" },
  description: "Explore the MCT Students’ Union student hub for law resources, campus notices, Union activities and student support at MCT College of Legal Studies, Melmuri.",
  applicationName: "MCT Students’ Union",
  openGraph: { type: "website", locale: "en_IN", siteName: "MCT Students’ Union", title: "MCT Students’ Union | Your Voice. Your Campus. Our Community.", description: "A student-led digital hub for law resources, campus updates, student welfare and Union activities at MCT College of Legal Studies, Melmuri.", url: "https://mct-students-union.vercel.app", images: [{ url: "/images/og-mct-students-union.svg", width: 1200, height: 630, alt: "MCT Students’ Union — Your Voice. Your Campus. Our Community." }] },
  twitter: { card: "summary_large_image", title: "MCT Students’ Union | Student Hub & Support", description: "Law resources, campus updates, Union activities and student support at MCT College of Legal Studies.", images: ["/images/og-mct-students-union.svg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<MCTChatBot /></body>
    </html>
  );
}
