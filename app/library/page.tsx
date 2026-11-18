import "../connect.css";
import "../instagram-3d.css";
import "../premium-type.css";
import "./library.css";
import "../modern-refresh.css";
import Link from "next/link";
import ActionArrow from "../components/ActionArrow";
import type { Metadata } from "next";
import { PublishedUnionContent } from "../components/PublishedUnionContent";
import "../published.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Law Students’ Digital Library & Study Resources",
  description: "Explore the developing MCT law students’ digital library for previous question papers, study materials, model answers and legal reference resources.",
  alternates: { canonical: "/library" },
  openGraph: { title: "Law Students’ Digital Library | MCT Students’ Union", description: "Find law study resources and updates from the MCT Students’ Union digital library.", url: "/library", images: ["/images/og-mct-students-union.png"] },
  twitter: { card: "summary_large_image", images: ["/images/og-mct-students-union.png"] },
};

const bareActs = [
  { name: "Constitution of India", href: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf" },
  { name: "Indian Contract Act, 1872", href: "https://www.indiacode.nic.in/bitstream/123456789/2187/2/A187209.pdf" },
  { name: "Bharatiya Nyaya Sanhita, 2023 (BNS)", href: "https://www.mha.gov.in/files/documents/250883_english01042024.pdf" },
  { name: "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)", href: "https://www.mha.gov.in/files/documents/250884_2english_01042024.pdf" },
  { name: "Bharatiya Sakshya Adhiniyam, 2023 (BSA)", href: "https://www.mha.gov.in/files/documents/250882_english_01042024_0.pdf" },
  { name: "Code of Civil Procedure, 1908", href: "https://www.indiacode.nic.in/bitstream/123456789/2191/1/aA1908-05.pdf" },
  { name: "Transfer of Property Act, 1882", href: "https://www.indiacode.nic.in/bitstream/123456789/14648/1/tpa.pdf" },
  { name: "Specific Relief Act, 1963", href: "https://www.indiacode.nic.in/bitstream/123456789/1583/7/A1963-47.pdf" },
];

export default function LibraryPage() {
  return (
    <main id="main-content" tabIndex={-1} className="connect">
      <header className="nav">
        <div className="wrap navinner">
          <Link className="union-identity" href="/" aria-label="MCT Students' Union home">
            <img src="https://mctlawcollege.org/assets/images/branding/logo-new.webp" alt="MCT College of Legal Studies crest" width="49" height="56" />
            <span><strong>MCT <em>STUDENTS&apos; UNION</em></strong><small>COLLEGE OF LEGAL STUDIES</small></span>
          </Link>
          <Link className="navbtn" href="/"><ActionArrow direction="left" /> Back home</Link>
        </div>
      </header>

      <section className="innerhero">
        <div className="wrap">
          <div className="breadcrumbs">MCT STUDENTS’ UNION / ACADEMICS</div>
          <div className="eyebrow">ACADEMIC RESOURCE CENTRE</div>
          <h1>Law Students’ Digital Library</h1>
          <p>Shared academic resources and study materials for MCT law students.</p>
        </div>
      </section>

      <section className="section library-resources">
        <div className="wrap">
          <div className="sectionhead">
            <div><div className="eyebrow">ACADEMIC RESOURCE CENTRE</div><h2>Built for law students.</h2></div>
            <p>Explore question papers, study materials and legal reference resources.</p>
          </div>
          <div className="library-folder-grid">
            <article className="library-folder">
              <span className="num">01 / ACADEMICS</span>
              <h3>Question papers, study materials &amp; model answers</h3>
              <p>Access shared collections of previous year papers, study materials and model answers on Google Drive.</p>
              <div className="library-resource-links">
                <a href="https://drive.google.com/drive/folders/1Cm4hUJZwqSd4bXYS9HGHqbJxnrgSCEUQ" target="_blank" rel="noopener noreferrer">Study Resources 01 <span aria-hidden="true"><ActionArrow /></span></a>
                <a href="https://drive.google.com/drive/folders/16K7BELHTotsZm7wT0GLx05qLvmnlLAjN" target="_blank" rel="noopener noreferrer">Study Resources 02 <span aria-hidden="true"><ActionArrow /></span></a>
              </div>
            </article>
            <article className="library-folder">
              <span className="num">02 / ACADEMICS</span>
              <h3>Bare Acts &amp; judgments</h3>
              <p>Read the texts of key Indian laws directly from the Government of India’s India Code collection.</p>
              <div className="library-resource-links library-bare-act-links" aria-label="Official Bare Act PDFs">
                {bareActs.map(act => <a href={act.href} key={act.name} target="_blank" rel="noopener noreferrer">{act.name}<span aria-hidden="true"><ActionArrow /></span></a>)}
              </div>
              <div className="library-source-note">Official government PDFs · <a href="https://indiacode.gov.in/" target="_blank" rel="noopener noreferrer">Find a document on India Code</a> if a PDF doesn’t open · Judgments coming later</div>
            </article>
          </div>
          <div style={{marginTop:32}}><h2>Union-managed PDF collection</h2><p>Study documents uploaded by authorised Union administration.</p><PublishedUnionContent kind="library" /></div>
          <p className="library-access-note">Study-material links open external Google Drive folders; access depends on the folder owners’ sharing permissions. Bare Act links open official government documents from India Code or the Ministry of Home Affairs. Check the latest amendments and commencement provisions when using legal texts.</p>
          <p className="library-return"><Link className="btn" href="/"><ActionArrow direction="left" /> Return to Students’ Union</Link></p>
        </div>
      </section>
      <footer className="footer"><div className="wrap"><div className="logo">MCT <span>STUDENTS&apos; UNION</span></div><p>Learn · Lead · Belong</p><div className="footerlinks"><a href="https://mctlawcollege.org/" target="_blank" rel="noopener noreferrer">Official college website <ActionArrow /></a></div></div></footer>
    </main>
  );
}
