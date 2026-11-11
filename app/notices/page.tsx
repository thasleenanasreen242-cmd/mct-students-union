import type { Metadata } from "next";
import Link from "next/link";
import { PublishedUnionContent } from "../components/PublishedUnionContent";
import "../published.css";
export const dynamic = "force-dynamic";
export const metadata:Metadata = {title:"Union Notices",description:"Published MCT Students’ Union announcements, academic notices and campus updates."};
export default function Page(){return <main id="main-content" className="connect"><div className="wrap" style={{padding:"65px 0",minHeight:"70vh"}}><Link href="/">← Home</Link><p className="eyebrow">OFFICIAL UPDATES</p><h1>Notices & announcements</h1><p>Verified updates published by the MCT Students’ Union.</p><PublishedUnionContent kind="notice"/></div></main>}
