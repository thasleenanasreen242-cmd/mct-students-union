import type { Metadata } from "next";
import Link from "next/link";
import { PublishedUnionContent } from "../components/PublishedUnionContent";
import "../published.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Union Activities",description:"Union activities, initiatives, photos and outcomes at MCT College of Legal Studies."};
export default function Page(){return <main id="main-content" className="connect"><div className="wrap" style={{padding:"65px 0",minHeight:"70vh"}}><Link href="/">← Home</Link><p className="eyebrow">CAMPUS LIFE</p><h1>Union activities</h1><p>Activities, photographs and documented outcomes.</p><PublishedUnionContent kind="activity"/></div></main>}
