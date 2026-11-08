import "../connect.css";
import "../instagram-3d.css";
import "../premium-type.css";
import "./library.css";
import Link from "next/link";

const resources = [
  {
    title: "Study Resources 01",
    description: "Open the first shared collection of academic resources on Google Drive.",
    href: "https://drive.google.com/drive/folders/1Cm4hUJZwqSd4bXYS9HGHqbJxnrgSCEUQ",
  },
  {
    title: "Study Resources 02",
    description: "Open the second shared collection of academic resources on Google Drive.",
    href: "https://drive.google.com/drive/folders/16K7BELHTotsZm7wT0GLx05qLvmnlLAjN",
  },
];

export default function LibraryPage() {
  return (
    <main className="connect">
      <header className="nav">
        <div className="wrap navinner">
          <Link className="union-identity" href="/" aria-label="MCT Students' Union home">
            <img src="https://mctlawcollege.org/assets/images/branding/logo-new.webp" alt="MCT College of Legal Studies crest" width="49" height="56" />
            <span><strong>MCT <em>STUDENTS&apos; UNION</em></strong><small>COLLEGE OF LEGAL STUDIES</small></span>
          </Link>
          <Link className="navbtn" href="/">← Back home</Link>
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
            <div><div className="eyebrow">AVAILABLE COLLECTIONS</div><h2>Explore study resources.</h2></div>
            <p>Access the shared folders below. Files are hosted on Google Drive.</p>
          </div>
          <div className="library-folder-grid">
            {resources.map((resource, index) => (
              <a className="library-folder" href={resource.href} target="_blank" rel="noopener noreferrer" key={resource.href}>
                <div className="library-folder-top"><span className="library-folder-icon" aria-hidden="true">▤</span><span className="num">COLLECTION 0{index + 1}</span></div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <span className="library-open">Open Google Drive folder ↗</span>
              </a>
            ))}
          </div>
          <p className="library-access-note">These links open external Google Drive folders. Access and downloads depend on the folder owners’ sharing permissions. Folder contents have not yet been independently catalogued.</p>
          <p className="library-return"><Link className="btn" href="/">← Return to Students’ Union</Link></p>
        </div>
      </section>
      <footer className="footer"><div className="wrap"><div className="logo">MCT <span>STUDENTS&apos; UNION</span></div><p>Learn · Lead · Belong</p><div className="footerlinks"><a href="https://mctlawcollege.org/" target="_blank" rel="noopener noreferrer">Official college website ↗</a></div></div></footer>
    </main>
  );
}
