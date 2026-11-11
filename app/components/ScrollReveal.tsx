"use client";
import { useEffect } from "react";
export default function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });
    targets.forEach((target) => observer.observe(target));
    const closeMenu = (event: Event) => {
      if ((event.target as HTMLElement).closest(".mobilelinks a")) {
        document.querySelector<HTMLDetailsElement>(".mobile-menu")?.removeAttribute("open");
      }
    };
    document.addEventListener("click", closeMenu);
    return () => { observer.disconnect(); document.removeEventListener("click", closeMenu); };
  }, []);
  return null;
}