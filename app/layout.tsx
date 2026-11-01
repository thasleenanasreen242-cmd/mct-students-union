import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCT Students' Union | Student Support & Resources",
  description:
    "A student-led space for MCT College of Legal Studies students to find academic resources, notices and support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}