"use client";

import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent } from "react";
import ActionArrow from "./ActionArrow";
import CourtIcon, { type CourtIconName } from "./CourtIcon";
import styles from "./MobileNavigation.module.css";

type NavigationLink = { href: string; label: string; icon: CourtIconName };

export default function MobileNavigation({ links }: { links: NavigationLink[] }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (menu.current?.open && event.target instanceof Node && !menu.current.contains(event.target)) {
        menu.current.open = false;
      }
    }

    const desktop = window.matchMedia("(min-width: 801px)");
    function closeOnDesktop() {
      if (desktop.matches && menu.current) menu.current.open = false;
    }

    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  function closeOnEscape(event: KeyboardEvent) {
    if (event.key === "Escape" && menu.current?.open) {
      event.preventDefault();
      menu.current.open = false;
      trigger.current?.focus();
    }
  }

  return (
    <details ref={menu} className={styles.menu} onKeyDown={closeOnEscape}>
      <summary ref={trigger} className={styles.trigger}>
        <span className={styles.glyph} aria-hidden="true"><span /><span /></span>
        <span>Menu</span>
      </summary>
      <nav className={styles.panel} aria-label="Mobile navigation">
        <ul className={styles.links}>
          {links.map(({ href, label, icon }) => (
            <li key={href}>
              <Link href={href} onNavigate={() => { if (menu.current) menu.current.open = false; }}>
                <span className={styles.icon}><CourtIcon name={icon} /></span>
                <span>{label}</span>
                <ActionArrow direction="right" />
              </Link>
            </li>
          ))}
        </ul>
        <Link className={styles.support} href="/student-support" onNavigate={() => { if (menu.current) menu.current.open = false; }}>
          <span className={styles.icon}><CourtIcon name="shield" /></span>
          <span>Student support</span>
          <ActionArrow />
        </Link>
      </nav>
    </details>
  );
}
