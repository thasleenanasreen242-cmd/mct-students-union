const programmes = [
  {
    number: "01",
    name: "BBA LL.B (Hons.)",
    detail: "Five-year integrated law programme",
    semesters: "10 semesters",
    href: "#five-year",
  },
  {
    number: "02",
    name: "LL.B (Unitary)",
    detail: "Three-year undergraduate law programme",
    semesters: "6 semesters",
    href: "#three-year",
  },
];

const updates = [
  { tag: "ACADEMIC", title: "Previous question paper library", date: "RESOURCE" },
  { tag: "STUDENT SUPPORT", title: "Student grievance portal", date: "COMING SOON" },
  { tag: "UNION", title: "Notices and student announcements", date: "UPDATES" },
];

function Brand() {
  return (
    <a className="brand" href="#" aria-label="MCT Students Union home">
      <span className="brand-mark">M<span>✳</span></span>
      <span className="brand-copy">
        <strong>MCT STUDENTS&apos; UNION</strong>
        <small>COLLEGE OF LEGAL STUDIES</small>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <div className="topline">
        <div className="container topline-inner">
          <span> MCT COLLEGE OF LEGAL STUDIES · MELMURI, MALAPPURAM</span>
          <span className="topline-right">A student-led support & resource space</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#resources">Resources</a>
            <a href="#programmes">Programmes</a>
            <a href="#notices">Notices</a>
          </nav>
          <a className="nav-cta" href="#grievance">Student support <span>↗</span></a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="container hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> THE STUDENT COMMUNITY</div>
          <h1>Your voice.<br /><em>Your campus.</em><br />Your community.</h1>
          <p className="hero-description">
            A shared space for MCT law students to stay informed, access academic
            resources and make student voices heard.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#resources">Explore resources <span>↗</span></a>
            <a className="text-link light-link" href="#grievance">Raise a concern <span>→</span></a>
          </div>
          <div className="hero-foot">
            <span>LEARN TOGETHER. STAND TOGETHER.</span>
            <span className="hero-index">01 / 04</span>
          </div>
        </div>
        <div className="hero-side-note">STUDENT LIFE · ACADEMICS · SUPPORT</div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> ABOUT THIS SPACE</div>
            <h2>Law school is a journey.<br /><em>Let&apos;s make it better, together.</em></h2>
          </div>
          <div className="intro-copy">
            <p>
              Created as a student-led digital hub for the MCT College of Legal
              Studies community. Find academic material, follow important
              announcements and discover ways to connect with student support.
            </p>
            <p className="muted">Built around access, participation and a stronger student community.</p>
          </div>
        </div>
      </section>

      <section className="programmes section-pad" id="programmes">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> YOUR ACADEMIC PATH</div>
              <h2>Choose your <em>programme.</em></h2>
            </div>
            <p>Dedicated academic resource spaces<br />for both law programmes.</p>
          </div>
          <div className="programme-grid">
            {programmes.map((programme) => (
              <a className="programme-card" href={programme.href} key={programme.number}>
                <span className="card-number">{programme.number}</span>
                <span className="card-arrow">↗</span>
                <div>
                  <h3>{programme.name}</h3>
                  <p>{programme.detail}</p>
                  <span className="semester-count">{programme.semesters}</span>
                </div>
                <span className="card-bottom">EXPLORE RESOURCES <b>→</b></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="resources section-pad" id="resources">
        <div className="container">
          <div className="eyebrow"><span className="eyebrow-line" /> ACADEMIC TOOLKIT</div>
          <div className="section-heading resource-heading">
            <h2>Everything you need<br /><em>for the next step.</em></h2>
            <p>Find question papers by programme, semester<br />and subject. More resources will be added.</p>
          </div>
          <div className="resource-grid">
            <article className="resource-card" id="five-year">
              <div className="resource-icon">⌘</div>
              <span className="resource-label">FIVE-YEAR PROGRAMME</span>
              <h3>BBA LL.B<br />(Hons.)</h3>
              <p>Previous question papers arranged across all 10 semesters.</p>
              <span className="resource-status">LIBRARY BEING PREPARED</span>
            </article>
            <article className="resource-card featured-resource" id="three-year">
              <div className="resource-icon">§</div>
              <span className="resource-label">THREE-YEAR PROGRAMME</span>
              <h3>LL.B<br />(Unitary)</h3>
              <p>Previous question papers arranged across all 6 semesters.</p>
              <span className="resource-status">LIBRARY BEING PREPARED</span>
            </article>
            <article className="resource-card" id="grievance">
              <div className="resource-icon">✳</div>
              <span className="resource-label">STUDENT SUPPORT</span>
              <h3>Grievance<br />Portal</h3>
              <p>A private channel for students to share concerns and seek support.</p>
              <span className="resource-status">PORTAL SETUP IN PROGRESS</span>
            </article>
          </div>
          <p className="privacy-note">Privacy matters. Grievance submissions will be accessible only to authorised student representatives once the secure portal is enabled.</p>
        </div>
      </section>

      <section className="notices section-pad" id="notices">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE NOTICEBOARD</div>
              <h2>Stay in the <em>loop.</em></h2>
            </div>
            <p>One place for student updates,<br />resources and important information.</p>
          </div>
          <div className="notice-list">
            {updates.map((item, index) => (
              <article className="notice-row" key={item.title}>
                <span className="notice-number">0{index + 1}</span>
                <div className="notice-main"><span>{item.tag}</span><h3>{item.title}</h3></div>
                <span className="notice-date">{item.date}</span>
                <span className="notice-arrow">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="container closing-inner">
          <div className="eyebrow"><span className="eyebrow-line" /> THE MCT COMMUNITY</div>
          <h2>Stronger voices.<br /><em>Stronger futures.</em></h2>
          <a className="button button-light" href="#resources">Explore the student hub <span>↗</span></a>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-top">
          <Brand />
          <p>A student-led digital space for<br />MCT College of Legal Studies.</p>
          <a href="https://mctlawcollege.org/" target="_blank" rel="noreferrer">College website ↗</a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} MCT Students&apos; Union</span>
          <span>Melmuri · Malappuram · Kerala</span>
          <span>MADE FOR STUDENTS, WITH STUDENTS.</span>
        </div>
        <div className="container disclaimer">
          This is an independent student-led resource website and is not presented as the official college website.
        </div>
      </footer>
    </main>
  );
}