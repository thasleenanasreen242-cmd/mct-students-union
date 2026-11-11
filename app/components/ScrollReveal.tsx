"use client";
import { useEffect } from "react";
export default function ScrollReveal() {
  useEffect(() => {
    const closeMenu = (event: Event) => {
      if ((event.target as HTMLElement).closest(".mobilelinks a")) {
        document.querySelector<HTMLDetailsElement>(".mobile-menu")?.removeAttribute("open");
      }
    };
    document.addEventListener("click", closeMenu);
    return () => { document.removeEventListener("click", closeMenu); };
  }, []);
  return null;
}
