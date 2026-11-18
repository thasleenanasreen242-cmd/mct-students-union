import type { Metadata } from "next";
import Link from "next/link";
import { PublishedUnionContent } from "../components/PublishedUnionContent";
import "../published.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Union Events",description:"Upcoming events and campus schedules published by MCT Students’ Union."};
export default function Page(){return <main id="main-content" className="connect"><div className="wrap" style={{padding:"65px 0",minHeight:"70vh"}}><Link href="/">← Home</Link><p className="eyebrow">CAMPUS CALENDAR</p><h1>Events & schedules</h1><p>Confirmed upcoming and past campus events.</p><PublishedUnionContent kind="event"/></div></main>}
