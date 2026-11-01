"use client";

import { useMemo, useState } from "react";
import VirtualCourtroom from "./components/VirtualCourtroom";

const programmes = [
  { label: "05 YEARS", title: "BBA LL.B (Hons.)", detail: "Integrated business and law programme", semesters: "10 semesters", href: "#five-year" },
  { label: "03 YEARS", title: "LL.B (Unitary)", detail: "Undergraduate law programme", semesters: "6 semesters", href: "#three-year" },
];

const quickLinks = [
  { icon: "▤", title: "Question bank", detail: "Search and download previous papers by semester and subject", href: "#question-bank", tag: "ACADEMICS" },
  { icon: "§", title: "Smart study area", detail: "Organise papers, legal references and revision materials", href: "#study-area", tag: "STUDY" },
  { icon: "✳", title: "Grievance portal", detail: "Submit confidential complaints and track progress privately", href: "#support", tag: "SUPPORT" },
  { icon: "▦", title: "Noticeboard", detail: "View announcements, academic updates and deadlines", href: "#notices", tag: "CAMPUS" },
  { icon: "◷", title: "Events calendar", detail: "See Students&apos; Union programmes and college events", href: "#events", tag: "CAMPUS" },
  { icon: "◎", title: "Student directory", detail: "Find classmates who have chosen to be listed", href: "#directory", tag: "COMMUNITY" },
];

const notices = [
  { category: "ACADEMIC", title: "Academic resource library is being prepared", date: "COMING SOON", number: "01" },
  { category: "STUDENTS' UNION", title: "Student announcements and updates", date: "UPDATES SOON", number: "02" },
  { category: "CAMPUS LIFE", title: "Events and activities calendar", date: "COMING SOON", number: "03" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeProgramme, setActiveProgramme] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ from: "bot", text: "Hello! I can help you find question papers, programme information, notices and student support. What would you like to know?" }]);
  const sendChat = (value = chatInput) => {
    const text = value.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    let answer = "I can help with the question bank, BBA LL.B and LL.B programmes, notices, events, student directory or grievance support. Try asking about one of these.";
    if (lower.includes("paper") || lower.includes("question bank") || lower.includes("previous")) answer = "The question bank is being prepared for both programmes. Use the Question bank section to find the BBA LL.B (Hons.) and LL.B (Unitary) paper collections. PDF downloads will be enabled when papers are uploaded.";
    else if (lower.includes("bba") || lower.includes("five") || lower.includes("5 year")) answer = "The BBA LL.B (Hons.) is the five-year programme, organised across 10 semesters. Visit the Programmes section for its student resource area.";
    else if (lower.includes("unitary") || lower.includes("three") || lower.includes("3 year") || lower.includes("ll.b")) answer = "The LL.B (Unitary) is the three-year programme, organised across 6 semesters. Visit the Programmes section for its student resource area.";
    else if (lower.includes("grievance") || lower.includes("complaint") || lower.includes("problem")) answer = "The grievance portal is planned for confidential submissions and private progress tracking. It will open only after secure storage and access controls are ready. For now, use the official college website for contact information.";
    else if (lower.includes("notice") || lower.includes("deadline") || lower.includes("announcement")) answer = "Academic notices and student announcements will appear on the Noticeboard. The current notice area is a preview and does not yet contain live announcements.";
    else if (lower.includes("event") || lower.includes("calendar") || lower.includes("programme")) answer = "Union programmes and college events will be listed in the Events Calendar once dates and venues are confirmed.";
    else if (lower.includes("directory") || lower.includes("classmate") || lower.includes("student")) answer = "The student directory is planned as an opt-in feature. Only students who explicitly consent will be listed.";
    setChatMessages((items) => [...items, { from: "user", text }, { from: "bot", text: answer }]);
    setChatInput("");
  };
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
            <span className="identity-seal official-logo-wrap"><img src="https://mctlawcollege.org/assets/images/branding/logo-new.webp" alt="MCT College of Legal Studies official logo" /></span>
            <span className="identity-text"><strong>MCT STUDENTS&apos; UNION</strong><small>COLLEGE OF LEGAL STUDIES</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#about">About</a><a href="#programmes">Programmes</a><a href="#resources">Resources</a><a href="#notices">Noticeboard</a>
          </nav>
          <button className="mobile-menu-toggle" type="button" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}><span /><span /></button>
          <a className="header-action" href="#support">Student support <span>↗</span></a>
        </div>
        {mobileMenuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#about" onClick={() => setMobileMenuOpen(false)}>About <span>↗</span></a><a href="#programmes" onClick={() => setMobileMenuOpen(false)}>Programmes <span>↗</span></a><a href="#resources" onClick={() => setMobileMenuOpen(false)}>Resources <span>↗</span></a><a href="#notices" onClick={() => setMobileMenuOpen(false)}>Noticeboard <span>↗</span></a><a href="#support" onClick={() => setMobileMenuOpen(false)}>Student support <span>↗</span></a></nav>}
      </header>

      <section className="hero-section hero-premium">
        <div className="hero-grid-pattern" />
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-light"><span /> LEARN&nbsp; · &nbsp;LEAD&nbsp; · &nbsp;BELONG</div>
            <h1>MCT Students&apos; Union<br /><em>Your voice. Your campus. Your community.</em></h1>
            <p>A connected space for academic excellence, student welfare and a vibrant campus community at MCT College of Legal Studies.</p>
            <div className="hero-buttons"><a className="button button-gold" href="#resources">Explore our resources <b>↗</b></a><a className="hero-text-link" href="#about">About our union <span>→</span></a></div>
            <div className="hero-meta"><span>ACADEMICS <b>·</b> COMMUNITY <b>·</b> SUPPORT</span><span className="hero-meta-number">MCT <i>·</i> MELMURI</span></div>
          </div>
          <div className="hero-art" aria-label="MCT College of Legal Studies facility photograph">
            <div className="art-frame"><div className="art-topline"><span>MCT / STUDENT UNION</span><span>MELMURI · KERALA</span></div><img className="hero-campus-photo" src="https://mctlawcollege.org/assets/images/facilities/fac1.webp" alt="MCT College of Legal Studies facility in Melmuri, Malappuram" /><div className="art-caption"><span>KNOWLEDGE</span><span>JUSTICE</span><span>UNITY</span></div></div>
            <div className="art-stamp">YOUR CAMPUS<br /><b>YOUR VOICE</b></div>
          </div>
        </div>
        <div className="hero-bottom-line" />
      </section>
      <section className="hero-feature-strip" aria-label="Student hub quick access">
        <div className="site-container hero-feature-grid">{quickLinks.map((item, index) => <a className="hero-feature-card" href={item.href} key={item.title}><span className="hero-feature-icon">{item.icon}</span><strong>{item.title}</strong><small>{index === 0 ? "Find previous papers" : index === 1 ? "Organise your study" : index === 2 ? "Private student support" : index === 3 ? "Updates and deadlines" : index === 4 ? "Campus programmes" : "Connect by consent"}</small><b>↗</b></a>)}</div>
      </section>

      <section className="intro-section section-space" id="about">
        <div className="site-container intro-layout">
          <div className="intro-heading"><div className="eyebrow"><span /> A SPACE BUILT FOR STUDENTS</div><h2>More than a website.<br /><em>A stronger student community.</em></h2></div>
          <div className="intro-copy"><p>This student-led platform brings useful academic tools and community updates into one accessible place. Whether you&apos;re preparing for an exam, looking for a previous paper or seeking support, start here.</p><a className="underlined-link" href="#resources">Explore what you can do <span>↗</span></a></div>
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
          <div className="hub-tools"><label className="hub-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search student resources..." aria-label="Search student resources" /></label><div className="hub-filters"><button className={activeProgramme === "all" ? "active" : ""} onClick={() => setActiveProgramme("all")}>All</button><button className={activeProgramme === "academics" ? "active" : ""} onClick={() => setActiveProgramme("academics")}>Academics</button><button className={activeProgramme === "study" ? "active" : ""} onClick={() => setActiveProgramme("study")}>Study</button><button className={activeProgramme === "wellbeing" ? "active" : ""} onClick={() => setActiveProgramme("support")}>Support</button><button className={activeProgramme === "campus" ? "active" : ""} onClick={() => setActiveProgramme("campus")}>Campus</button><button className={activeProgramme === "community" ? "active" : ""} onClick={() => setActiveProgramme("community")}>Community</button></div></div>
          <div className="hub-card-grid">{filteredLinks.map((item, i) => <a href={item.href} className="hub-card" key={item.title}><div className="hub-card-top"><span className="hub-icon">{item.icon}</span><span className="hub-card-number">0{i + 1}</span></div><div><span className="hub-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.detail}</p></div><div className="hub-card-link">EXPLORE <b>↗</b></div></a>)}</div>
          {filteredLinks.length === 0 && <p className="empty-search">No matching resources. Try another search.</p>}
          <div className="library-callout" id="study-area"><div><span className="eyebrow eyebrow-light"><span /> BUILT FOR LAW STUDENTS</span><h3>Your smart study<br /><em>space starts here.</em></h3><p>Keep previous papers, subject references and revision resources organised by programme, semester and subject.</p></div><div className="library-callout-mark">§</div></div>
          <div className="programme-resource-row" id="question-bank"><div id="five-year"><span>05-YEAR PROGRAMME</span><strong>BBA LL.B (Hons.)</strong><small>10 semesters · Search and download previous papers</small></div><div id="three-year"><span>03-YEAR PROGRAMME</span><strong>LL.B (Unitary)</strong><small>6 semesters · Search and download previous papers</small></div></div>
        </div>
      </section>

      <VirtualCourtroom />

      <section className="support-section section-space" id="support"><div className="site-container support-layout"><div><div className="eyebrow"><span /> YOUR VOICE MATTERS</div><h2>Support that<br /><em>takes you seriously.</em></h2><p>A dedicated space is being prepared for students to raise concerns privately and follow up through a secure reference process.</p><a className="button button-navy" href="https://mctlawcollege.org/" target="_blank" rel="noreferrer">Contact student union <b>↗</b></a></div><div className="support-panel"><div className="support-panel-head"><span>STUDENT SUPPORT</span><b>PRIVATE BY DESIGN</b></div><div className="support-step"><span>01</span><div><strong>Share a concern</strong><small>Identified or anonymous submission options planned.</small></div></div><div className="support-step"><span>02</span><div><strong>Receive a reference</strong><small>Private tracking without public exposure.</small></div></div><div className="support-step"><span>03</span><div><strong>Follow progress</strong><small>Updates visible only to the student and authorised reviewers.</small></div></div><div className="support-secure">✳ &nbsp; Submissions will open after secure access controls are implemented.</div></div></div></section>

      <section className="notice-section section-space" id="notices"><div className="site-container"><div className="section-head"><div><div className="eyebrow"><span /> THE NOTICEBOARD</div><h2>Stay informed.<br /><em>Stay connected.</em></h2></div><p>Academic updates, student union announcements and campus activities — together in one place.</p></div><div className="notice-list">{notices.map((n) => <article className="notice-item" key={n.number}><span className="notice-no">{n.number}</span><div className="notice-title"><small>{n.category}</small><h3>{n.title}</h3></div><span className="notice-date">{n.date}</span><span className="notice-arrow">↗</span></article>)}</div></div></section>

      <section className="events-directory-section section-space" id="events"><div className="site-container events-directory-grid">
        <div className="events-block"><div className="eyebrow"><span /> CAMPUS LIFE</div><h2>Make room for<br /><em>what&apos;s happening.</em></h2><p>One calendar for Students&apos; Union programmes, academic dates and college events.</p><div className="event-placeholder"><span className="event-date">CALENDAR</span><div><strong>Upcoming events will appear here</strong><small>Event dates, venues and registration details will be published once confirmed.</small></div><b>↗</b></div></div>
        <div className="directory-block" id="directory"><div className="eyebrow eyebrow-light"><span /> STUDENT COMMUNITY</div><h2>Find your people.<br /><em>Stay connected.</em></h2><p>A voluntary directory for classmates who choose to share a limited student profile.</p><div className="directory-consent"><span className="consent-mark">◎</span><div><strong>Opt-in, not automatic</strong><small>Only students who explicitly consent may be listed. Contact details stay hidden unless separately chosen for sharing.</small></div></div><span className="directory-status">DIRECTORY PREPARATION · NO PROFILES PUBLISHED</span></div>
      </div></section>

      <section className="closing-section"><div className="site-container closing-inner"><div className="eyebrow eyebrow-light"><span /> MCT STUDENTS&apos; UNION</div><h2>Learn together.<br /><em>Move forward together.</em></h2><p>A stronger student experience begins with a connected community.</p><a className="button button-gold" href="#resources">Explore the student hub <b>↗</b></a></div></section>

      <div className="student-chat">
        {chatOpen && <section className="chat-window" aria-label="MCT student help chat">
          <div className="chat-head"><div className="chat-avatar">M</div><div><strong>MCT Student Help</strong><small><span /> Quick answers · Student hub</small></div><button type="button" className="chat-close" aria-label="Close chat" onClick={() => setChatOpen(false)}>×</button></div>
          <div className="chat-body" aria-live="polite">
            {chatMessages.map((message, index) => <div className={message.from === "user" ? "chat-message user-message" : "chat-message bot-message"} key={index}>{message.text}</div>)}
            {chatMessages.length === 1 && <div className="chat-suggestions"><button type="button" onClick={() => sendChat("How do I find previous question papers?")}>Question papers</button><button type="button" onClick={() => sendChat("Tell me about the programmes")}>Programmes</button><button type="button" onClick={() => sendChat("How can I submit a grievance?")}>Student support</button></div>}
          </div>
          <form className="chat-compose" onSubmit={(event) => { event.preventDefault(); sendChat(); }}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about the student hub..." aria-label="Type your question" /><button type="submit" aria-label="Send message" disabled={!chatInput.trim()}>↑</button></form>
          <p className="chat-disclaimer">Automated quick answers. For official information, check college announcements.</p>
        </section>}
        <button type="button" className="chat-launcher" onClick={() => setChatOpen((open) => !open)} aria-expanded={chatOpen} aria-label={chatOpen ? "Close student help chat" : "Open student help chat"}><span className="chat-launcher-icon">{chatOpen ? "×" : "✳"}</span><span>{chatOpen ? "Close" : "Ask MCT"}</span></button>
      </div>
      <footer className="site-footer"><div className="site-container footer-main"><a className="identity identity-footer" href="#"><span className="identity-seal"><b>M</b><small>✳</small></span><span className="identity-text"><strong>MCT STUDENTS&apos; UNION</strong><small>COLLEGE OF LEGAL STUDIES</small></span></a><p>A student-led digital space for<br />the MCT College of Legal Studies community.</p><a className="footer-official" href="https://mctlawcollege.org/" target="_blank" rel="noreferrer">Official college website ↗</a></div><div className="site-container footer-bottom"><span>© {new Date().getFullYear()} MCT Students&apos; Union</span><span>Melmuri · Malappuram · Kerala</span><span>MADE FOR STUDENTS, WITH STUDENTS.</span></div><div className="site-container footer-disclaimer">Independent student-led platform. Not the official college website. College affiliation or endorsement is not implied.</div></footer>
    </main>
  );
}
