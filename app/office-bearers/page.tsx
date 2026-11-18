import type { Metadata } from "next";
import Link from "next/link";
import { PublishedUnionContent } from "../components/PublishedUnionContent";
import "../published.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Office-bearers",description:"Meet the MCT Students’ Union office-bearers and representatives."};
export default function Page(){return <main id="main-content" className="connect"><div className="wrap" style={{padding:"65px 0",minHeight:"70vh"}}><Link href="/">← Home</Link><p className="eyebrow">OUR TEAM</p><h1>Union office-bearers</h1><p>Current elected representatives and office-bearers.</p><PublishedUnionContent kind="office_bearer"/></div></main>}
