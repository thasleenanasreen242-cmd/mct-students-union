import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Contact the Union About a Student Concern",
 description: "Contact the MCT Students’ Union about student concerns using its published WhatsApp channel.",
 alternates: {canonical:"/grievances"},
 robots: {index:false,follow:false},
};
export default function GrievanceRedirect() {
  redirect("https://wa.me/919496744513?text=Hello%2C%20I%20would%20like%20to%20raise%20a%20student%20concern.");
}
