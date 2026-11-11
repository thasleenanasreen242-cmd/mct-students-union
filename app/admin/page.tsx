import "../connect.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Union Administration",
 description: "Information about planned MCT Students’ Union administration tools. Administrative access is not yet enabled.",
 alternates: {canonical:"/admin"},
 robots: {index:false,follow:false},
};
export default function Admin(){return <main id="main-content" tabIndex={-1} className="connect"><header className="nav"><div className="wrap navinner"><Link className="union-identity" href="/" aria-label="MCT Students' Union home"><img src="https://mctlawcollege.org/assets/images/branding/logo-new.webp" alt="MCT College of Legal Studies crest" width="49" height="56"/><span><strong>MCT <em>STUDENTS&apos; UNION</em></strong><small>COLLEGE OF LEGAL STUDIES</small></span></Link><Link className="navbtn" href="/">← Back home</Link></div></header><section className="innerhero"><div className="wrap"><span className="eyebrow">ADMINISTRATIVE ACCESS</span><h1>Union administration</h1><p>Manage grievances, academic resources, suggestions, announcements, activities and progress data through a protected administrative dashboard.</p></div></section><section className="section"><div className="wrap admin-alert"><div className="note"><strong>Administrative access is not enabled.</strong> Student records, uploads and private complaint data cannot be managed securely until role-based authentication, protected storage and audit logging are configured. No public administration controls are exposed.</div><h2>Planned management modules</h2><div className="cards">{["Grievance cases","Library PDFs","Suggestions","Transparency metrics","Initiatives & activity","Announcements & events"].map(x=><div className="card" key={x}><h3>{x}</h3><p>Restricted to authorised union administrators.</p></div>)}</div></div></section></main>}
