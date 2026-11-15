import type { Metadata } from "next";
import Link from "next/link";
import ActionArrow from "../components/ActionArrow";
import TransparencyFigures from "../components/TransparencyFigures";
import "../connect.css";
import "../modern-refresh.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Union Transparency Dashboard",
  description: "Published totals for student issues, programmes and welfare initiatives.",
  alternates: { canonical: "/transparency" },
};

export default function TransparencyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="connect">
      <header className="nav">
        <div className="wrap navinner">
          <Link className="union-identity" href="/" aria-label="MCT Students’ Union home">
            <strong>MCT <em>STUDENTS&apos; UNION</em></strong>
          </Link>
          <Link className="navbtn" href="/#transparency"><ActionArrow direction="left" /> Back home</Link>
        </div>
      </header>
      <section className="innerhero">
        <div className="wrap">
          <div className="eyebrow">UNION TRANSPARENCY</div>
          <h1>Accountability, made visible.</h1>
          <p>Verified totals for student issues, programmes and welfare initiatives.</p>
        </div>
      </section>
      <section className="section" aria-label="Published transparency figures">
        <div className="wrap"><TransparencyFigures full /></div>
      </section>
    </main>
  );
}
