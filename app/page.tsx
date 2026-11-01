"use client";

import { useMemo, useState } from "react";

const programmes = [
  { label: "05 YEARS", title: "BBA LL.B (Hons.)", detail: "Integrated business and law programme", semesters: "10 semesters", href: "#five-year" },
  { label: "03 YEARS", title: "LL.B (Unitary)", detail: "Undergraduate law programme", semesters: "6 semesters", href: "#three-year" },
];

const quickLinks = [
  { icon: "▤", title: "Question papers", detail: "Search by programme, semester and subject", href: "#resources", tag: "ACADEMICS" },
  { icon: "§", title: "Legal resources", detail: "Bare Acts, judgments and study materials", href: "#legal-library", tag: "STUDY" },
  { icon: "✳", title: "Student support", detail: "A private channel to raise a concern", href: "#support", tag: "WELLBEING" },
  { icon: "▦", title: "Events & notices", detail: "Keep up with student and union updates", href: "#notices", tag: "CAMPUS" },
];

const notices = [
  { category: "ACADEMIC", title: "Academic resource library is being prepared", date: "COMING SOON", number: "01" },
  { category: "STUDENTS' UNION", title: "Student announcements and updates", date: "UPDATES SOON", number: "02" },
  { category: "CAMPUS LIFE", title: "Events and activities calendar", date: "COMING SOON", number: "03" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeProgramme, setActiveProgramme] = useState("all");
  const filteredLinks = useMemo(() => quickLinks.filter((item) =>
    (activeProgramme === "all" || item.tag.toLowerCase() === activeProgramme) &&
    (item.title + " " + item.detail).toLowerCase().includes(query.toLowerCase())
  ), [query, activeProgramme]);

  return (
    <main className="site-shell">
      <div className="utility-bar">
        <div className="site-container utility-inner">
          <span>MCT COLLEGE OF LEGAL STUDIES <i /> MELMURI, MALAPPURAM</span>
          <span className="utility-right">A STUDENT-LED DIGITAL COMMUNITY <b>↗</b></span>
        </div>
      </div>

      <header className="main-header">
        <div className="site-container header-inner">
          <a className="identity" href="#" aria-label="MCT Students' Union home">
            <span className="identity-seal"><b>M</b><small>✳</small></span>
            <span className="identity-text"><strong>MCT STUDENTS' UNION</strong><small>COLLEGE OF LEGAL STUDIES</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#about">About</a><a href="#programmes">Programmes</a><a href="#resources">Resources</a><a href="#notices">Noticeboard</a>
          </nav>
          <a className="header-action" href="#support">Student support <span>↗</span></a>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-grid-pattern" />
        <div className="hero-ring ring-a" /><div className="hero-ring ring-b" />
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-light"><span /> THE MCT STUDENT COMMUNITY</div>
            <h1>Learn with purpose.<br /><em>Lead with confidence.</em></h1>
            <p>A shared digital space for MCT law students — bringing academic resources, student support and campus updates together.</p>
            <div className="hero-buttons"><a className="button button-gold" href="#resources">Explore the student hub <b>↗</b></a><a className="hero-text-link" href="#about">Discover our community <span>→</span></a></div>
            <div className="hero-meta"><span>ACADEMICS <b>·</b> COMMUNITY <b>·</b> SUPPORT</span><span className="hero-meta-number">01 <i>/</i> 04</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-frame"><div className="art-topline"><span>MCT / STUDENT UNION</span><span>EST. COMMUNITY</span></div><div className="art-monogram">M<span>§</span></div><div className="art-caption"><span>KNOWLEDGE</span><span>JUSTICE</span><span>UNITY</span></div></div>
            <div className="art-stamp">MELMURI<br /><b>KERALA</b></div>
            <div className="art-side-label">YOUR CAMPUS. YOUR VOICE.</div>
          </div>
        </div>
        <div className="hero-bottom-line" />
      </section>

      <section className="intro-section section-space" id="about">
        <div className="site-container intro-layout">
          <div className="intro-heading"><div className="eyebrow"><span /> A SPACE BUILT FOR STUDENTS</div><h2>More than a website.<br /><em>A stronger student community.</em></h2></div>
          <div className="intro-copy"><p>This student-led platform brings useful academic tools and community updates into one accessible place. Whether you're preparing for an exam, looking for a previous paper or seeking support, start here.</p><a className="underlined-link" href="#resources">Explore what you can do <span>↗</span></a></div>
        </div>
        <div className="site-container stats-strip"><div><strong>02</strong><span>LAW PROGRAMMES</span></div><div><strong>16</strong><span>SEMESTERS ACROSS PROGRAMMES</span></div><div><strong>01</strong><span>CONNECTED STUDENT HUB</span></div><div className="stats-note">A shared space<br />for every MCT law student.</div></div>
      </section>

      <section className="programmes-section section-space" id="programmes">
        <div className="site-container">
          <div className="section-head"><div><div className="eyebrow"><span /> FIND YOUR ACADEMIC SPACE</div><h2>One community.<br /><em>Two pathways.</em></h2></div><p>Dedicated academic spaces for both programmes, organised to make study resources easier to find.</p></div>
          <div className="programme-cards">{programmes.map((p, i) => <a href={p.href} className="programme-tile" key={p.title}><div className="tile-top"><span>{p.label}</span><b>0{i + 1}</b></div><div className="tile-main"><h3>{p.title}</h3><p>{p.detail}</p></div><div className="tile-bottom"><span>{p.semesters}</span><b>Explore programme <i>↗</i></b></div></a>)}</div>
        </div>
      </section>

      <section className="hub-section section-space" id="resources">
        <div className="site-container">
          <div className="hub-heading"><div><div className="eyebrow eyebrow-light"><span /> THE STUDENT WORKSPACE</div><h2>Everything in one<br /><em>well-organised place.</em></h2></div><p>Find the right resource, stay informed and get connected with the student community.</p></div>
          <div className="hub-tools"><label className="hub-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search student resources..." aria-label="Search student resources" /></label><div className="hub-filters"><button className={activeProgramme === "all" ? "active" : ""} onClick={() => setActiveProgramme("all")}>All</button><button className={activeProgramme === "academics" ? "active" : ""} onClick={() => setActiveProgramme("academics")}>Academics</button><button className={activeProgramme === "study" ? "active" : ""} onClick={() => setActiveProgramme("study")}>Study</button><button className={activeProgramme === "wellbeing" ? "active" : ""} onClick={() => setActiveProgramme("wellbeing")}>Support</button><button className={activeProgramme === "campus" ? "active" : ""} onClick={() => setActiveProgramme("campus")}>Campus</button></div></div>
          <div className="hub-card-grid">{filteredLinks.map((item, i) => <a href={item.href} className="hub-card" key={item.title}><div className="hub-card-top"><span className="hub-icon">{item.icon}</span><span className="hub-card-number">0{i + 1}</span></div><div><span className="hub-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.detail}</p></div><div className="hub-card-link">EXPLORE <b>↗</b></div></a>)}</div>
          {filteredLinks.length === 0 && <p className="empty-search">No matching resources. Try another search.</p>}
          <div className="library-callout" id="legal-library"><div><span className="eyebrow eyebrow-light"><span /> BUILT FOR LAW STUDENTS</span><h3>Your legal learning<br /><em>toolkit starts here.</em></h3><p>We are preparing a structured library for question papers, legal study references and programme materials.</p></div><div className="library-callout-mark">§</div></div>
          <div className="programme-resource-row"><div id="five-year"><span>05-YEAR PROGRAMME</span><strong>BBA LL.B (Hons.)</strong><small>10 semesters · Question paper library in preparation</small></div><div id="three-year"><span>03-YEAR PROGRAMME</span><strong>LL.B (Unitary)</strong><small>6 semesters · Question paper library in preparation</small></div></div>
        </div>
      </section>

      <section className="support-section section-space" id="support"><div className="site-container support-layout"><div><div className="eyebrow"><span /> YOUR VOICE MATTERS</div><h2>Support that<br /><em>takes you seriously.</em></h2><p>A dedicated space is being prepared for students to raise concerns privately and follow up through a secure reference process.</p><a className="button button-navy" href="https://mctlawcollege.org/" target="_blank" rel="noreferrer">Contact student union <b>↗</b></a></div><div className="support-panel"><div className="support-panel-head"><span>STUDENT SUPPORT</span><b>PRIVATE BY DESIGN</b></div><div className="support-step"><span>01</span><div><strong>Share a concern</strong><small>Identified or anonymous submission options planned.</small></div></div><div className="support-step"><span>02</span><div><strong>Receive a reference</strong><small>Private tracking without public exposure.</small></div></div><div className="support-step"><span>03</span><div><strong>Follow progress</strong><small>Updates visible only to the student and authorised reviewers.</small></div></div><div className="support-secure">✳ &nbsp; Submissions will open after secure access controls are implemented.</div></div></div></section>

      <section className="notice-section section-space" id="notices"><div className="site-container"><div className="section-head"><div><div className="eyebrow"><span /> THE NOTICEBOARD</div><h2>Stay informed.<br /><em>Stay connected.</em></h2></div><p>Academic updates, student union announcements and campus activities — together in one place.</p></div><div className="notice-list">{notices.map((n) => <article className="notice-item" key={n.number}><span className="notice-no">{n.number}</span><div className="notice-title"><small>{n.category}</small><h3>{n.title}</h3></div><span className="notice-date">{n.date}</span><span className="notice-arrow">↗</span></article>)}</div></div></section>

      <section className="closing-section"><div className="site-container closing-inner"><div className="eyebrow eyebrow-light"><span /> MCT STUDENTS' UNION</div><h2>Learn together.<br /><em>Move forward together.</em></h2><p>A stronger student experience begins with a connected community.</p><a className="button button-gold" href="#resources">Explore the student hub <b>↗</b></a></div></section>

      <footer className="site-footer"><div className="site-container footer-main"><a className="identity identity-footer" href="#"><span className="identity-seal"><b>M</b><small>✳</small></span><span className="identity-text"><strong>MCT STUDENTS' UNION</strong><small>COLLEGE OF LEGAL STUDIES</small></span></a><p>A student-led digital space for<br />the MCT College of Legal Studies community.</p><a className="footer-official" href="https://mctlawcollege.org/" target="_blank" rel="noreferrer">Official college website ↗</a></div><div className="site-container footer-bottom"><span>© {new Date().getFullYear()} MCT Students' Union</span><span>Melmuri · Malappuram · Kerala</span><span>MADE FOR STUDENTS, WITH STUDENTS.</span></div><div className="site-container footer-disclaimer">Independent student-led platform. Not the official college website. College affiliation or endorsement is not implied.</div></footer>
    </main>
  );
}
