import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Support & Welfare Information",
  description: "Find guidance for student concerns, academic support, welfare and safety information, Union contacts and ways to improve campus life at MCT College of Legal Studies.",
  alternates: { canonical: "/student-support" },
  openGraph: { title: "Student Support | MCT Students’ Union", description: "Find the right route for student concerns, academic guidance, welfare information and Union support.", url: "/student-support", images: ["/images/og-mct-students-union.svg"] },
  twitter: { card: "summary_large_image", title: "Student Support | MCT Students’ Union", description: "Guidance for student concerns, welfare information and Union support.", images: ["/images/og-mct-students-union.svg"] },
};

const supportAreas = [
  { n: "01", title: "Raise a concern", desc: "Share a concern about student welfare, campus facilities, classroom experience or other student matters with the Union.", action: "Contact the Union", href: "https://wa.me/919496744513?text=Hello%2C%20I%20would%20like%20to%20raise%20a%20student%20concern." },
  { n: "02", title: "Academic support", desc: "For questions about classes, examinations, attendance, syllabus or academic procedures, contact the relevant college office through its official channels.", action: "Visit college website", href: "https://mctlawcollege.org/" },
  { n: "03", title: "Student welfare and safety", desc: "For welfare, anti-ragging, harassment or safety concerns, approach the appropriate authorised college committee or official. Verified committee contacts will be published here when supplied.", action: "View official college channels", href: "https://mctlawcollege.org/" },
  { n: "04", title: "Ideas and improvements", desc: "Suggest practical improvements to facilities, learning resources, campus activities and student life.", action: "Share a suggestion", href: "/suggestions" },
];

export default function StudentSupportPage() {
  return <main className="connect">
    <header className="nav"><div className="wrap navinner"><Link className="union-identity" href="/"><img src="https://mctlawcollege.org/assets/images/branding/logo-new.webp" alt="MCT College of Legal Studies crest" width="49" height="56"/><span><strong>MCT <em>STUDENTS&apos; UNION</em></strong><small>COLLEGE OF LEGAL STUDIES</small></span></Link><Link className="navbtn" href="/">Back to home</Link></div></header>
    <section className="innerhero"><div className="wrap"><div className="breadcrumbs"><Link href="/">Home</Link> / Student support</div><div className="eyebrow">YOU ARE NOT ON YOUR OWN</div><h1>Student support</h1><p>A clear starting point for academic questions, student concerns, welfare information and ideas to improve campus life.</p></div></section>
    <section className="section"><div className="wrap"><div className="support-intro"><div><div className="eyebrow">FIND THE RIGHT SUPPORT</div><h2>Tell us what you need help with.</h2></div><p>Choose the route that best matches your concern. For matters requiring an official decision, use the relevant college office or authorised committee.</p></div><div className="support-grid">{supportAreas.map(x=><article className="support-card" key={x.n}><span className="support-no">{x.n} / SUPPORT</span><h3>{x.title}</h3><p>{x.desc}</p><Link className="textlink" href={x.href} target={x.href.startsWith("http") ? "_blank" : undefined} rel={x.href.startsWith("http") ? "noopener noreferrer" : undefined}>{x.action} <span aria-hidden="true">↗</span></Link></article>)}</div></div></section>
    <section className="section alt"><div className="wrap support-guidance"><div><div className="eyebrow">IMPORTANT</div><h2>Share information safely.</h2></div><ul><li>Describe the issue clearly and include relevant dates or context.</li><li>Do not post passwords, bank details, identity documents or sensitive personal information in public messages.</li><li>If you need confidentiality, ask the authorised college office or committee about its formal process before sharing sensitive details over messaging apps.</li><li>This website and the Union WhatsApp contact are not emergency services and cannot guarantee an immediate response.</li></ul></div></section>
    <section className="section"><div className="wrap support-contact"><div><div className="eyebrow">CURRENTLY PUBLISHED UNION CONTACT</div><h2>Reach the Students’ Union.</h2><p>Use the published WhatsApp contact to start a conversation about a student concern.</p></div><Link className="btn" href="https://wa.me/919496744513?text=Hello%2C%20I%20would%20like%20to%20contact%20the%20MCT%20Students%27%20Union." target="_blank" rel="noopener noreferrer">Open WhatsApp contact ↗</Link></div><div className="wrap support-pending"><p><strong>Information to be added after official confirmation:</strong> General Secretary and office-bearer contacts, academic support contact, student welfare contact, anti-ragging committee, Internal Complaints Committee, legal aid committee and emergency contact details.</p></div></section>
    <footer className="footer"><div className="wrap"><div className="logo">MCT <span>STUDENTS&apos; UNION</span></div><div className="footerlinks"><Link href="/">Home</Link><Link href="/faq">FAQs</Link><Link href="/library">Library</Link><Link href="/suggestions">Suggestions</Link><a href="https://mctlawcollege.org/" target="_blank" rel="noopener noreferrer">Official college website</a></div><div className="footerbottom">Independent student-led platform; not the official college website.</div></div></footer>
    <style jsx>{`
      .support-intro{display:flex;justify-content:space-between;align-items:end;gap:35px;margin-bottom:30px}.support-intro>p{max-width:440px}
      .support-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
      .support-card{background:#fff;border:1px solid #dce3eb;border-top:3px solid #c51d38;padding:28px;min-height:235px;display:flex;flex-direction:column}
      .support-no{font-size:11px;font-weight:800;color:#c51d38;letter-spacing:.12em}.support-card h3{margin-top:18px}
      .support-card p{flex:1}.support-card .textlink{font-weight:800;font-size:13px}
      .support-guidance{display:grid;grid-template-columns:.8fr 1.2fr;gap:50px;align-items:start}
      .support-guidance ul{margin:0;padding-left:20px;color:#52657a;line-height:1.9;font-size:14px}
      .support-contact{display:flex;align-items:center;justify-content:space-between;gap:30px}
      .support-pending{margin-top:25px}.support-pending p{background:#fff5f6;border-left:3px solid #c51d38;padding:15px 18px;font-size:13px}
      @media(max-width:700px){.support-intro,.support-contact{display:block}.support-grid,.support-guidance{grid-template-columns:1fr;gap:15px}.support-contact .btn{margin-top:15px}.support-card{min-height:0}}
    `}</style>
  </main>;
}
