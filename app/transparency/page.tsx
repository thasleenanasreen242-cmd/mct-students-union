import type { Metadata } from "next";
import Link from "next/link";
import ActionArrow from "../components/ActionArrow";
import CourtIcon from "../components/CourtIcon";
import TransparencyFigures from "../components/TransparencyFigures";
import styles from "./transparency.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Union Transparency Dashboard",
  description: "Published totals for student issues, programmes and welfare initiatives.",
  alternates: { canonical: "/transparency" },
};

export default function TransparencyPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link className={styles.brand} href="/" aria-label="MCT Students’ Union home">
            <img src="https://mctlawcollege.org/assets/images/branding/logo-new.webp" alt="" width="35" height="40" />
            <span>MCT <strong>STUDENTS&apos; UNION</strong></span>
          </Link>
          <Link className={styles.back} href="/#transparency"><ActionArrow direction="left" /> Back home</Link>
        </div>
      </header>
      <div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="transparency-title">
          <div>
            <div className={styles.eyebrow}>Union transparency</div>
            <h1 id="transparency-title">Accountability,<br /> made visible.</h1>
            <p>Verified totals for student issues, programmes and welfare initiatives.</p>
          </div>
          <div className={styles.heroIcon} aria-hidden="true"><CourtIcon name="landmark" /></div>
        </section>
        <TransparencyFigures full />
      </div>
    </main>
  );
}
