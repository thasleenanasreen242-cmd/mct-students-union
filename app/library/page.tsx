import "../connect.css";
import "../instagram-3d.css";
import "../premium-type.css";
import "./library.css";
import "../modern-refresh.css";
import Link from "next/link";
import ActionArrow from "../components/ActionArrow";

export default function LibraryPage() {
  return (
    <main className="connect">
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
              <p>Legal texts, judgments and case references will be added as the resource catalogue develops.</p>
              <span className="library-coming-soon">RESOURCES COMING SOON</span>
            </article>
          </div>
          <p className="library-access-note">These links open external Google Drive folders. Access and downloads depend on the folder owners’ sharing permissions. Folder contents have not yet been independently catalogued.</p>
          <p className="library-return"><Link className="btn" href="/"><ActionArrow direction="left" /> Return to Students’ Union</Link></p>
        </div>
      </section>
      <footer className="footer"><div className="wrap"><div className="logo">MCT <span>STUDENTS&apos; UNION</span></div><p>Learn · Lead · Belong</p><div className="footerlinks"><a href="https://mctlawcollege.org/" target="_blank" rel="noopener noreferrer">Official college website <ActionArrow /></a></div></div></footer>
    </main>
  );
}
