import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs — Student Hub, Library & Union Services",
  description: "Find answers about MCT Students’ Union services, student support, grievances, suggestions, digital library resources and campus notices.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "Frequently Asked Questions | MCT Students’ Union", description: "Quick answers about student support, Union services, law resources and campus updates.", url: "/faq", images: ["/images/og-mct-students-union.png"] },
  twitter: { card: "summary_large_image", title: "FAQs | MCT Students’ Union", description: "Answers about student support, resources and Union services.", images: ["/images/og-mct-students-union.png"] },
};

const questions = [
  { q: "Who can use the MCT Students’ Union website?", a: "The website is intended as an information and engagement hub for students of MCT College of Legal Studies. Some resources may be available to visitors, while student-specific services may be added as they are confirmed." },
  { q: "How can I raise a student concern?", a: "Use the Student Support page and the listed Union WhatsApp contact to explain your concern. Include only the information needed to understand the issue. Do not share passwords, financial details or sensitive personal documents in a public channel." },
  { q: "Can I submit a suggestion for campus improvement?", a: "Yes. Visit the Suggestions page to share an idea about academics, facilities, student welfare, sports or campus activities. The availability of submission and tracking features will be shown on that page." },
  { q: "Where can I find study materials and previous question papers?", a: "Visit the Digital Library. Resources are being organised by programme, semester and subject. Availability may vary as materials are collected and checked." },
  { q: "Are the notices and event dates official?", a: "Only confirmed information should be treated as a current notice. Items marked as awaiting confirmation are placeholders and should not be relied on as final dates or instructions." },
  { q: "How do I contact the Students’ Union?", a: "Use the Student Support page for the currently published contact route. Office-bearer and committee contact details will be added after they are verified and approved for publication." },
  { q: "Is this the official MCT College website?", a: "No. This is an independent student-led digital platform for the MCT Students’ Union. For official college information, visit mctlawcollege.org." },
  { q: "What should I do if I need urgent help?", a: "Do not rely on this website or WhatsApp for emergencies. If someone is in immediate danger or needs urgent medical or police assistance, contact the appropriate local emergency service and the college through its official channels." },
];

export default function FAQPage() {
  return <main className="connect">
    <header className="nav"><div className="wrap navinner"><Link className="union-identity" href="/"><img src="https://mctlawcollege.org/assets/images/branding/logo-new.webp" alt="MCT College of Legal Studies crest" width="49" height="56"/><span><strong>MCT <em>STUDENTS&apos; UNION</em></strong><small>COLLEGE OF LEGAL STUDIES</small></span></Link><Link className="navbtn" href="/">Back to home</Link></div></header>
    <section className="innerhero"><div className="wrap"><div className="breadcrumbs"><Link href="/">Home</Link> / Frequently asked questions</div><div className="eyebrow">HELP CENTRE / QUICK ANSWERS</div><h1>Frequently asked questions</h1><p>Find clear answers about student support, the digital library, Union services and this website.</p></div></section>
    <section className="section"><div className="wrap faq-layout"><div className="faq-intro"><div className="eyebrow">NEED A HAND?</div><h2>Start with the answer you need.</h2><p>If your question is not covered here, visit the Student Support page to find the available contact route.</p><Link className="btn" href="/student-support">Go to student support</Link></div><div className="faq-list">{questions.map((item,i)=><details className="faq-item" key={item.q}><summary><span className="faq-number">{String(i+1).padStart(2,"0")}</span><strong>{item.q}</strong><span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>
    <footer className="footer"><div className="wrap"><div className="logo">MCT <span>STUDENTS&apos; UNION</span></div><div className="footerlinks"><Link href="/">Home</Link><Link href="/student-support">Student support</Link><Link href="/library">Library</Link><Link href="/suggestions">Suggestions</Link></div><div className="footerbottom">Independent student-led platform; not the official college website.</div></div></footer>
    <style>{`
      .faq-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:60px;align-items:start}
      .faq-intro{position:sticky;top:120px}.faq-intro h2{font-size:clamp(28px,3vw,40px)}
      .faq-list{border-top:1px solid #dce3eb}.faq-item{border-bottom:1px solid #dce3eb;padding:0 4px}
      .faq-item summary{list-style:none;display:flex;align-items:center;gap:16px;padding:23px 4px;cursor:pointer;color:#071a30}
      .faq-item summary::-webkit-details-marker{display:none}.faq-number{font-size:11px;font-weight:800;color:#c51d38;letter-spacing:.1em}
      .faq-item summary strong{font-size:15px;flex:1}.faq-plus{font-size:23px;color:#c51d38;transition:transform .2s}
      .faq-item[open] .faq-plus{transform:rotate(45deg)}.faq-item>p{margin:0 35px 22px;color:#52657a;font-size:14px;line-height:1.8}
      @media(max-width:760px){.faq-layout{grid-template-columns:1fr;gap:28px}.faq-intro{position:static}.faq-item summary{gap:11px}.faq-item summary strong{font-size:14px}}
    `}</style>
  </main>;
}
