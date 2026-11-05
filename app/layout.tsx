import type { Metadata } from "next";
import "./globals.css";
import MCTChatBot from "./components/MCTChatBot";

export const metadata: Metadata = {
  title: "MCT Students' Union | Student Support & Resources",
  description:
    "A student-led digital space for MCT College of Legal Studies students to access academic resources, notices and student support.",
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
